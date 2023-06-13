import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextResponse } from 'next/server';
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt"

import { withAuth } from 'next-auth/middleware'
import { generateRegExpFromPaths, testPathAgainstRegExp } from '@/app/libs/utils';

let headers = { 'accept-language': 'en-US,en;q=0.5' };
let languages = new Negotiator({ headers }).languages();
let locales = ['en-US', 'en', 'ar'];
let defaultLocale = 'en-US';

const PUBLIC_FILE = /\.(.*)$/

const PROTECTED_ROUTES = ['/profile/:path', '/users'];
const protectedRoutesRegExp = generateRegExpFromPaths(PROTECTED_ROUTES);


// Get the preferred locale, similar to above or using a library
function getLocale(request: NextRequest) {
    return match(languages, locales, defaultLocale);
}

export default withAuth(
    async function middleware(request) {
        const pathname = request.nextUrl.pathname

        // Skip next internal and image requests
        if (
            request.nextUrl.pathname.startsWith('/_next') ||
            request.nextUrl.pathname.includes('/api/') ||
            PUBLIC_FILE.test(request.nextUrl.pathname)
        ) {
            return NextResponse.next();
        }

        const pathnameIsMissingLocale = locales.every(
            (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
        )
        const locale = getLocale(request)

        const token = await getToken({ req: request })
        const isAuth = !!token
        const isAuthPage = pathname.includes("/auth")
        const isProtectedPage = testPathAgainstRegExp(pathname, protectedRoutesRegExp)
        console.log(protectedRoutesRegExp, pathname, isProtectedPage )

        if (isAuthPage && isAuth) {
            if (pathnameIsMissingLocale) {
                return NextResponse.redirect(
                    new URL(`/${locale}/`, request.url)
                )
            }
            return NextResponse.redirect(
                new URL(`/${locale}/`, request.url)
            )
        }
        if (isProtectedPage && !isAuth) {
            // determine current page 
            let from = request.nextUrl.pathname;
            if (request.nextUrl.search) {
                from += request.nextUrl.search;
            }
            console.log('protected')
            if (pathnameIsMissingLocale) {
                return NextResponse.redirect(
                    new URL(`/${locale}/auth?from=${encodeURIComponent(from)}`, request.url)
                )
            }
            return NextResponse.redirect(
                new URL(`/auth?from=${encodeURIComponent(from)}`, request.url)
            )
        }
        /* if (isAuthPage) {
            if (isAuth) {
                redirectHandler(request, pathname, '/')
                return;
            }
            redirectHandler(request, pathname, pathname)
            return;
        }
        if (isProtectedPage && !isAuth) {
            // determine current page 
            let from = request.nextUrl.pathname;
            if (request.nextUrl.search) {
                from += request.nextUrl.search;
            }
            // adding current page to search params upon redirecting to Auth page
            redirectHandler(request, pathname, `/auth?from=${encodeURIComponent(from)}`)
            return;
        } */

        // Redirect if there is no locale and a public page
        // redirectHandler(request, pathname, pathname)
        if (pathnameIsMissingLocale) {
            return NextResponse.redirect(
                new URL(`/${locale}/${pathname}`, request.url)
            )
        }
        return NextResponse.next();
    },
    {
        callbacks: {
            async authorized() {
                // This is a work-around for handling redirect on auth pages.
                // We return true here so that the middleware function above
                // is always called.
                return true
            },
        },
    }
)


export const config = {
    matcher: [
        /*
        * Match all request paths except for the ones starting with:
        * - api (API routes)
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico (favicon file)
        */
        // Currently Not Working
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
        // Apply for protected routes
        //'/profile/:path*'
    ],
}

/* When Wrapping withAuth() it always protect the routes you pass on the matcher
for that they are always protected and can't be accessed without credientials
also you can specify the sign in page to redirect the user to if you do not the default one */

// This is a Regex that protect all '/profile/:path' and '/users'
// '/((?!api|_next\/static|_next\/image|favicon.ico).*)|^\/profile\/([^/]+)|\/users$/',