// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const originalUrl = url.pathname + url.search;

  // Set a custom header with the original URL
  request.headers.set('x-original-url', originalUrl);
  console.log('Original URL set in middleware:', originalUrl);

  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Apply middleware to all paths except API routes and static assets
};
