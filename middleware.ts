import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const session = await getToken({ req: request })
   
  if(!session) return NextResponse.redirect(new URL('/signin', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/signin",'/profile/:path*', '/favorites'],
}