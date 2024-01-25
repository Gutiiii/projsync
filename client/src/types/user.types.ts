export type RegisterUserFormData = {
    name: string,
    email: string,
    password: string
}

export type SigninUserFormData = {
    email: string
    password: string
}

export type ChangePasswordFormData = {
    password: string
    passwordConfirmation: string
}

export type UserPayload = {
    id: string,
    role: "EDITOR" | "VIEWER" | "CREATOR"
    userId: string
    projectId: string
    createdAt: string
    updatedAt: string
}