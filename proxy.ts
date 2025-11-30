import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Minimal proxy hook to keep optional global logic in the Node.js runtime
// Auth is handled at the page/component level using Clerk's auth() helper
export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|api|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
