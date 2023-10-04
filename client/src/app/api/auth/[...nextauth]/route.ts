import { BACKEND_URL } from "@/lib/constants"
import env from "@/lib/env"
import { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
// async function refreshToken(token: JWT): Promise<JWT> {
//     const res = await fetch(BACKEND_URL + "/auth/refresh", {
//         method: "POST",
//         headers: {
//             authorization: `Refresh ${token.backendTokens.refreshToken}`
//         }
//     })

//     const response = await res.json()

//     console.log("TOKEN refreshed")

//     return {
//         ...token,
//         backendTokens: response
//     }

// }

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) return null

                const { email, password } = credentials

                const res = await fetch(BACKEND_URL + "/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        email, password
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (res.status === 401) {
                    console.log(res.statusText)

                    return null
                }

                const user = await res.json()

                if (!user) return null

                return user
            },
        }),
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: env.GITHUB_ID,
            clientSecret: env.GITHUB_SECRET
        })
    ],
    pages: {
        signIn: "/signin",
        newUser: "/signup"
    }

    // callbacks: {
    //     async jwt({ token, user }) {
    //         if (user) return { ...token, ...user }

    //         if (new Date().getTime() < token.backendTokens.expiresIn) return token

    //         return await refreshToken(token)
    //     },
    //     async session({ token, session }) {
    //         session.user = token.user
    //         session.backendTokens = token.backendTokens
    //         return session
    //     }
    // }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

