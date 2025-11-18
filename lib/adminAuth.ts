import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware function to check admin password from request
 * Supports checking from:
 * 1. Authorization header: "Bearer password"
 * 2. X-Admin-Password header
 * 3. Query parameter: ?password=xxx
 */
export function verifyAdminPassword(request: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return false;
  }

  // Check Authorization header
  const authHeader = request.headers.get("authorization");
  if (authHeader) {
    const token = authHeader.replace("Bearer ", "").trim();
    if (token === adminPassword) {
      return true;
    }
  }

  // Check X-Admin-Password header
  const adminHeader = request.headers.get("x-admin-password");
  if (adminHeader === adminPassword) {
    return true;
  }

  // Check query parameter
  const searchParams = request.nextUrl.searchParams;
  const queryPassword = searchParams.get("password");
  if (queryPassword === adminPassword) {
    return true;
  }

  return false;
}

export function requireAdmin(request: NextRequest): NextResponse | null {
  if (!verifyAdminPassword(request)) {
    return NextResponse.json(
      { error: "Unauthorized - Admin password required" },
      { status: 401 }
    );
  }
  return null;
}

