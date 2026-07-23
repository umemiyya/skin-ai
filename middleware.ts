import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE_NAME, verifySessionToken } from '@/lib/session';

const PUBLIC_AUTH_ROUTES = ['/login', '/register'];

function isAdminRoute(pathname: string) {
  return pathname === '/admin' || pathname.startsWith('/admin/');
}
function isDashboardRoute(pathname: string) {
  return pathname === '/dashboard' || pathname.startsWith('/dashboard/');
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  const isProtected = isAdminRoute(pathname) || isDashboardRoute(pathname);
  const isAuthPage = PUBLIC_AUTH_ROUTES.includes(pathname);

  // Belum login tapi mencoba akses rute terproteksi -> lempar ke /login
  if (isProtected && !session) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('returnBackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Sudah login tapi role tidak sesuai dengan area yang diakses
  if (session && isAdminRoute(pathname) && session.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  if (session && isDashboardRoute(pathname) && session.role !== 'user') {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // Sudah login tapi membuka halaman login/register -> arahkan ke area masing-masing
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL(session.role === 'admin' ? '/admin' : '/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};