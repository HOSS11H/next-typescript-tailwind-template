import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextResponse } from 'next/server';
import type { NextRequest } from "next/server";

import { withAuth } from 'next-auth/middleware'

let headers = { 'accept-language': 'en-US,en;q=0.5' };
let languages = new Negotiator({ headers }).languages();
let locales = ['en-US', 'en', 'ar'];
let defaultLocale = 'en-US';

const PUBLIC_FILE = /\.(.*)$/

// Get the preferred locale, similar to above or using a library
function getLocale(request: NextRequest) {
    return match(languages, locales, defaultLocale);
}


export function middleware(request: NextRequest) {
    // Skip next internal and image requests
    if (
        request.nextUrl.pathname.startsWith('/_next') ||
        request.nextUrl.pathname.includes('/api/') ||
        PUBLIC_FILE.test(request.nextUrl.pathname)
    ) {
        return
    }
    // Check if there is any supported locale in the pathname
    const pathname = request.nextUrl.pathname
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request)

        // e.g. incoming request is /products
        // The new URL is now /en-US/products
        return NextResponse.redirect(
            new URL(`/${locale}/${pathname}`, request.url)
        )
    }
}

/* export default withAuth({
    pages: {
        signIn: '/auth',
    }
}) */

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
        // Optional: only run on root (/) URL
        // '/'
        // Apply for protected routes
        //'/profile/:path*'
    ],
}
