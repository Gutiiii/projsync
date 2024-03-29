import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            name: string
            role: string
            provider: string
        };
        backendTokens: {
            accessToken: string
        }
    }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            id: string;
            email: string;
            name: string
            role: string
            provider: string
        };
        backendTokens: {
            accessToken: string
        }
    }
}
