import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Minimal middleware for Edge runtime compatibility
// Auth is handled at the page/component level using Clerk's auth() helper
export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|api|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
