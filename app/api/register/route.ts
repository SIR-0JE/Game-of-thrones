import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import { assignHouse } from "@/lib/houseAssignment";
import { REGISTRATION_CONFIG } from "@/config/registration";

const DEPARTMENT_CODE_MAP: Record<string, string> = {
  "computer science": "CSC",
  "cyber security": "CYB",
  "information technology": "IFT",
  "software engineering": "SEN",
  "mass communication": "MAS",
};

function getDepartmentCode(department: string): string | undefined {
  return DEPARTMENT_CODE_MAP[department.trim().toLowerCase()];
}

// ADD THIS VALIDATION FUNCTION
function validateMatricNumber(
  level: string,
  department: string,
  matricNumber?: string
): string | null {
  const trimmedLevel = typeof level === "string" ? level.trim() : "";
  const trimmedDepartment = typeof department === "string" ? department.trim() : "";
  const normalizedMatric = matricNumber?.trim() ?? "";
  const departmentCode = trimmedDepartment ? getDepartmentCode(trimmedDepartment) : undefined;

  // For level 100, matric number is optional
  if (trimmedLevel === "100" && normalizedMatric === "") {
    return null; // No error
  }

  // For levels above 100, matric number is required
  if (trimmedLevel !== "100" && normalizedMatric === "") {
    return "Matric number is required";
  }

  if (normalizedMatric === "") {
    return null;
  }

  if (!departmentCode) {
    return "Invalid department selected";
  }

  const matricRegex = new RegExp(`^BU\\d{2}${departmentCode}\\d{4}$`);
  if (!matricRegex.test(normalizedMatric.toUpperCase())) {
    return `Invalid matric number format. Example: BU22${departmentCode}1068`;
  }

  return null; // No error
}

// ADD THIS FUNCTION TO CHECK FOR EXISTING MATRIC NUMBER
async function checkExistingMatricNumber(matricNumber: string): Promise<boolean> {
  if (!matricNumber || matricNumber.trim() === "") return false;
  
  const formattedMatricNumber = matricNumber.trim().toUpperCase();
  const existingStudent = await Student.findOne({
    matricNumber: formattedMatricNumber
  });
  
  return !!existingStudent;
}

export async function POST(request: NextRequest) {
  // Check if registration is locked
  if (!REGISTRATION_CONFIG.REGISTRATION_OPEN) {
    return NextResponse.json(
      { error: REGISTRATION_CONFIG.CLOSED_MESSAGE },
      { status: 403 }
    );
  }

  let safeName = "";
  let safeLevel = "";
  let safeDepartment = "";

  try {
    await connectDB();

    const { name, level, department, matricNumber } = await request.json();

    // Defensive assignments
    safeName = typeof name === "string" ? name : "";
    safeLevel = typeof level === "string" ? level : "";
    safeDepartment = typeof department === "string" ? department : "";

    if (!safeName || !safeLevel || !safeDepartment) {
      return NextResponse.json(
        { error: "Name, level, and department are required" },
        { status: 400 }
      );
    }

    // ADD MATRIC NUMBER VALIDATION
    const normalizedMatricNumber =
      typeof matricNumber === "string" ? matricNumber.trim().toUpperCase() : "";

    const matricValidationError = validateMatricNumber(
      safeLevel,
      safeDepartment,
      normalizedMatricNumber || undefined
    );
    if (matricValidationError) {
      return NextResponse.json(
        { error: matricValidationError },
        { status: 400 }
      );
    }

    // ADD DUPLICATE MATRIC NUMBER CHECK (only if matric number is provided)
    if (normalizedMatricNumber !== "") {
      const matricExists = await checkExistingMatricNumber(normalizedMatricNumber);
      if (matricExists) {
        return NextResponse.json(
          { error: "Matric number already exists" },
          { status: 400 }
        );
      }
    }

    // Check for duplicate submission (existing logic)
    const existingStudent = await Student.findOne({
      name: safeName.trim(),
      level: safeLevel.trim(),
      department: safeDepartment.trim(),
    });

    if (existingStudent) {
      return NextResponse.json({
        message: "Student already registered",
        student: existingStudent,
      });
    }

    // Assign house using balanced randomization
    const house = await assignHouse();

    const studentData = {
      name: safeName.trim(),
      level: safeLevel.trim(),
      department: safeDepartment.trim(),
      house,
      // UPDATE THIS: Only set matricNumber if provided and not empty
      matricNumber: normalizedMatricNumber !== "" ? normalizedMatricNumber : null,
    };

    const student = await Student.create(studentData);

    return NextResponse.json({
      message: "Student registered successfully",
      student,
    });
  } catch (error: any) {
    // Handle duplicate key error (updated for matric number)
    if (error.code === 11000) {
      // Check if it's a matric number duplicate error
      if (error.keyPattern && error.keyPattern.matricNumber) {
        return NextResponse.json(
          { error: "Matric number already exists" },
          { status: 400 }
        );
      }
      
      // Handle the existing name/level/department duplicate
      const keyValue = error.keyValue || {};
      const existingStudent = await Student.findOne({
        name: keyValue.name || safeName.trim(),
        level: keyValue.level || safeLevel.trim(),
        department: keyValue.department || safeDepartment.trim(),
      });

      if (existingStudent) {
        return NextResponse.json({
          message: "Student already registered",
          student: existingStudent,
        });
      }
    }

    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to register student" },
      { status: 500 }
    );
  }
}