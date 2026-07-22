// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     "/((?!_next|.*\\..*).*)",
//     "/",
//     "/(api|trpc)(.*)",
//   ],
// };


// middleware.ts
import { clerkMiddleware, clerkClient, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'


const ALLOWLIST = (process.env.ALLOWED_EMAILS ?? '')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean)

const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isProtectedRoute = createRouteMatcher(['/admin(.*)', '/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (!isProtectedRoute(req)) return

  const authObject = await auth()
  if (!authObject.userId) {
    return authObject.redirectToSignIn({ returnBackUrl: req.url })
  }

  // Cek allowlist HANYA untuk route /admin
  if (isAdminRoute(req)) {
    const client = await clerkClient()
    const user = await client.users.getUser(authObject.userId)
    const email = user.emailAddresses.find(
      (e) => e.id === user.primaryEmailAddressId
    )?.emailAddress?.toLowerCase()

    if (!email || !ALLOWLIST.includes(email)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  }

  // /dashboard: cukup sudah login, tidak perlu allowlist
})

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)', '/(api|trpc)(.*)'],
}