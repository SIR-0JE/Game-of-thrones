import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import { HouseType } from "@/config/houses";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  // Check admin password
  const authError = requireAdmin(request);
  if (authError) return authError;

  try {
    await connectDB();

    const total = await Student.countDocuments();

    const houses: HouseType[] = [
      "stark",
      "baratheon",
      "greyjoy",
      "lannister",
      "targaryen",
    ];

    const houseCounts: Record<HouseType, number> = {
      stark: 0,
      baratheon: 0,
      greyjoy: 0,
      lannister: 0,
      targaryen: 0,
    };

    for (const house of houses) {
      const count = await Student.countDocuments({ house });
      houseCounts[house] = count;
    }

    return NextResponse.json({
      stats: {
        total,
        houses: houseCounts,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

