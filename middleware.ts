import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if token exists in cookies
  const token = request.cookies.get('token')?.value;

  // If there's no token, redirect to login page
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect all dashboard routes
    '/dashboard',
    '/dashboard/:path*',
  ],
};
