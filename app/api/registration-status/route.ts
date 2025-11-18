import { NextResponse } from "next/server";
import { REGISTRATION_CONFIG } from "@/config/registration";

export async function GET() {
  return NextResponse.json({
    open: REGISTRATION_CONFIG.REGISTRATION_OPEN,
    message: REGISTRATION_CONFIG.CLOSED_MESSAGE,
  });
}

