import { NextRequest, NextResponse } from "next/server";


export async function middleware(req: NextRequest) {

    // const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    // return NextResponse.redirect(new URL('/about-2', req.url))
    return NextResponse.next();
}

export const config = {
    // TODO: Add a list of pages to match
    matcher: ['']
}