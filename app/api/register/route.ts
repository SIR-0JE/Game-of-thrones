import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import { assignHouse } from "@/lib/houseAssignment";

// ADD THIS VALIDATION FUNCTION
function validateMatricNumber(level: string, matricNumber?: string): string | null {
  // For level 100, matric number is optional
  if (level === "100" && (!matricNumber || matricNumber.trim() === "")) {
    return null; // No error
  }

  // For levels above 100, matric number is required
  if (level !== "100" && (!matricNumber || matricNumber.trim() === "")) {
    return "Matric number is required for levels above 100";
  }

  // If matric number is provided, validate format
  if (matricNumber && matricNumber.trim() !== "") {
    const matricRegex = /^BU\d{2}[A-Z]{3,4}\d{4}$/;
    if (!matricRegex.test(matricNumber)) {
      return "Invalid matric number format. Example: BU22CSC1068";
    }
  }

  return null; // No error
}

// ADD THIS FUNCTION TO CHECK FOR EXISTING MATRIC NUMBER
async function checkExistingMatricNumber(matricNumber: string): Promise<boolean> {
  if (!matricNumber || matricNumber.trim() === "") return false;
  
  const existingStudent = await Student.findOne({
    matricNumber: matricNumber.trim()
  });
  
  return !!existingStudent;
}

export async function POST(request: NextRequest) {
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
    const matricValidationError = validateMatricNumber(safeLevel, matricNumber);
    if (matricValidationError) {
      return NextResponse.json(
        { error: matricValidationError },
        { status: 400 }
      );
    }

    // ADD DUPLICATE MATRIC NUMBER CHECK (only if matric number is provided)
    if (matricNumber && matricNumber.trim() !== "") {
      const matricExists = await checkExistingMatricNumber(matricNumber);
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
      matricNumber: matricNumber && typeof matricNumber === "string" ? matricNumber.trim() : null,
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