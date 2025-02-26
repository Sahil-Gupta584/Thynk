import NextAuth, { NextAuthResult } from "next-auth";
import Google from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import Nodemailer from "next-auth/providers/nodemailer";
import { NextResponse } from "next/server";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw Error("invalid Keys");
}

const result = NextAuth({
    // debug: true,
    pages: {
        signIn: "/auth",
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Nodemailer({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
    ],
    adapter: SupabaseAdapter({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
    }),
    callbacks: {
        session: ({ session }) => {
            session.userId = session.userId;
            return session;
        },
        authorized: ({ auth, request }) => {
            if (!auth?.user?.id && request.nextUrl.pathname === "/quotes") {
                const newUrl = new URL("/auth", request.nextUrl.origin);
                console.log("a");

                return NextResponse.redirect(newUrl);
            }

            if (auth?.user?.id && request.nextUrl.pathname === "/auth") {
                const newUrl = new URL("/quotes", request.nextUrl.origin);
                console.log("redirecting to quotes");
                return NextResponse.redirect(newUrl);
            }
        },
    },
});

export const handlers: NextAuthResult["handlers"] = result.handlers;
export const auth: NextAuthResult["auth"] = result.auth;
export const signIn: NextAuthResult["signIn"] = result.signIn;
export const signOut: NextAuthResult["signOut"] = result.signOut;
