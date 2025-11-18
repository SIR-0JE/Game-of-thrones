import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import { HOUSE_CONFIG } from "@/config/houses";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  // Check admin password
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    await connectDB();

    const students = await Student.find({}).sort({ createdAt: -1 }).lean();

    // Generate CSV content
    const headers = [
      "Name",
      "Matric Number",
      "Level",
      "Department",
      "House",
      "Registered Date",
    ];

    const csvRows = [headers.join(",")];

    for (const student of students) {
      const row = [
        `"${student.name.replace(/"/g, '""')}"`,
        `"${(student.matricNumber || "").replace(/"/g, '""')}"`,
        `"${student.level.replace(/"/g, '""')}"`,
        `"${student.department.replace(/"/g, '""')}"`,
        `"${HOUSE_CONFIG[student.house].name}"`,
        `"${new Date(student.createdAt).toLocaleString()}"`,
      ];
      csvRows.push(row.join(","));
    }

    const csvContent = csvRows.join("\n");

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="students-export-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Error exporting CSV:", error);
    return NextResponse.json(
      { error: "Failed to export CSV" },
      { status: 500 }
    );
  }
}

