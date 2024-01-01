import { BACKEND_URL } from "@/lib/constants"
import env from "@/lib/env"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) return null
                const { email, password } = credentials
                const res = await fetch(BACKEND_URL + "/auth/signin", {
                    method: "POST",
                    body: JSON.stringify({
                        email, password
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (res.status === 401) {
                    return null
                }
                const user = await res.json()
                console.log("USER: ", user)

                if (!user) return null

                return user
            },
        }),
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, credentials }) {
            if (account?.provider === "credentials") {
                if (!credentials?.email || !credentials?.password) return false
                const { email, password } = credentials
                const res = await fetch(BACKEND_URL + "/auth/signin", {
                    method: "POST",
                    body: JSON.stringify({
                        email, password
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (res.status === 401 || res.status === 400) {
                    return false
                }
                const user = await res.json()

                if (!user) return false

                return user
            } else {
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
            }

        },
        async jwt({ token, user, account }) {
            if (account && ["google"].includes(account.provider)) {
                const email = user.email

                const res = await fetch(BACKEND_URL + "/auth/jwt", {
                    method: "POST",
                    body: JSON.stringify({
                        email
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const response = await res.json()
                token.user = response?.user
                token.backendTokens = response?.backendTokens
            }
            return { ...token, ...user }

        },
        async session({ token, session }) {
            session.user = token.user
            session.backendTokens = token.backendTokens
            return session
        }
    },
    pages: {
        signIn: "/signin",
    },

}
