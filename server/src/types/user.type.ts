export type User = {
    id: string,
    name: string
    email: string
    role: string
    provider: string
}

export type UserPayload = {
    id: string
    name: string
    email: string
    role: "ADMIN" | "USER"
    provider: "GOOGLE" | "CREDENTIALS"
    sub: {
        createdAt: string
        updatedAt: string
    }
    iat: number
}
