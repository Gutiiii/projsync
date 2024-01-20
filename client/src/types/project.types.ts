export type CreateProjectFormData = {
    id?: string | undefined,
    token?: string | undefined,
    title: string,
    description: string,
    role?: string,
}

export type EditProjectFormData = {
    id?: string | undefined,
    token?: string | undefined
    title: string
    description: string
    status?: string
}

export type DeleteProjectFormData = {
    id: string
    token?: string
}

export type ProjectCardType = {
    id: string;
    title: string;
    description: string;
    status: "OPEN" | "CLOSED";
    createdAt: string;
    userProject: {
        role: "CREATOR" | "EDITOR" | "VIEWER";
        userId: string
    }[];
};

export type Project = {
    id: string
    title: string
    description: string
    status: "OPEN" | "CLOSED";
    createdAt: string;
    userProject: {
        id: string;
        userId: string;
        projectId: string;
        role: "CREATOR" | "EDITOR" | "VIEWER";
        createdAt: string
        user: {
            name: string
        }
    }[];
}

export type CurrentUser = {
    id: string
    userId: string
    projectId: string
    role: "CREATOR" | "EDITOR" | "VIEWER";
    createdAt: string;
    user: {
        name: string
        email: string
    }
}

export type CreateInvitationFormData = {
    email: string
    role: "EDITOR" | "VIEWER";
    projectId: string
    token?: string
}

export type AcceptInvitationFormData = {
    invitationId: string
    token?: string,
}

export type DeleteInvitationFormData = {
    invitationId: string
    token?: string
}

export type EditMemberFormData = {
    userProjectId: string,
    role: string
    token?: string
}

export type RemoveMemberFormData = {
    userProjectId: string
    token?: string
}

