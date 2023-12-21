export type CreateProjectFormData = {
    id?: string | undefined,
    token?: string | undefined,
    title: string,
    description: string,
    role?: string,
}

export type ProjectCardType = {
    id: string;
    title: string;
    description: string;
    status: "OPEN" | "CLOSED";
    createdAt: string;
    userProject: {
        role: "CREATOR" | "EDITOR" | "VIEWER";
    }[];
};

export type Project = {
    id: string
    title: string
    description: string
    status: "OPEN" | "CLOSED";
    createdAt: string;
}
