import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/login'
  }
})

export const config = {
  matcher: [
    "/arena/:path*",
    "/api/submit/:path*",
    "/api/progress/:path*",
    "/api/level/:path*",
    "/api/chat/:path*",
  ],
}