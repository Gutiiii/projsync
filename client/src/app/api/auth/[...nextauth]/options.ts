import { BACKEND_URL } from "@/lib/constants"
import env from "@/lib/env"
import axios from "axios"
import { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
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
                console.log("CRE: ", credentials)
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
    ],
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        async signIn({ user, account }) {
            const name = user.name
            const email = user.email
            const provider = account?.provider.toUpperCase()

            const res = await fetch(BACKEND_URL + "/auth/provider", {
                method: "POST",
                body: JSON.stringify({
                    name, email, provider
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return true
        },
        // async jwt({ token, user }) {
        //     if (user) return { ...token, ...user }

        //     // if (new Date().getTime() < token.backendTokens.expiresIn) return token

        //     // return await refreshToken(token)
        // },
        // async session({ token, session }) {
        //     session.user = token.user
        //     session.backendTokens = token.backendTokens
        //     return session
        // }
    }
}
