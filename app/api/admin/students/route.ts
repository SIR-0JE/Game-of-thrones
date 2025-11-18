import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  // Check admin password
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    await connectDB();

    const students = await Student.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ students });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const deletedStudent = await Student.findByIdAndDelete(id).lean();

    if (!deletedStudent) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      deletedStudent,
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { error: "Failed to delete student" },
      { status: 500 }
    );
  }
}

