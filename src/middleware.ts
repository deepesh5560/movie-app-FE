import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;

  const isAuthPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/signup');

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/movies', req.url));
  }

  if (!token && req.nextUrl.pathname.startsWith('/movies')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/movies/:path*', '/login', '/signup'],
};
