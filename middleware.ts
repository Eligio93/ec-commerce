import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const token = req.nextauth.token;
    if (req.nextUrl.pathname.includes("/admin")) {
      if (token?.isAdmin) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(
          new URL("/accessDenied", req.nextUrl.origin),
        );
      }
    }
  },
);

export const config = { matcher: ["/admin/:path*", "/dashboard"] };
