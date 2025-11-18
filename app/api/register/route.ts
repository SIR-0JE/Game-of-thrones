import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import { assignHouse } from "@/lib/houseAssignment";

export async function POST(request: NextRequest) {
  // declare safeName, safeLevel, safeDepartment upfront
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

    // Check for duplicate submission
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
      matricNumber: typeof matricNumber === "string" ? matricNumber.trim() : "",
    };

    const student = await Student.create(studentData);

    return NextResponse.json({
      message: "Student registered successfully",
      student,
    });
  } catch (error: any) {
    // Handle duplicate key error
    if (error.code === 11000) {
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


