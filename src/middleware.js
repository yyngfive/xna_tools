import { NextResponse } from "next/server";
import i18n from "../i18n";
let locales = ['en', 'zh'];

// Get the preferred locale, similar to the above or using a library
//function getLocale(request) { ... }

export function middleware(request) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl;
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
    
    
    if (pathnameHasLocale) return;

    // Redirect if there is no locale
    const locale = i18n.defaultLocale;
    request.nextUrl.pathname = `/${locale}${pathname}`;
    
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/',
        '/((?!_next).*)',
        // Optional: only run on root (/) URL
    ],
};