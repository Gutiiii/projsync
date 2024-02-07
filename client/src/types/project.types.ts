import { UniqueIdentifier } from "@dnd-kit/core"

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

export type CreateListFormData = {
    title: string
    position: number
    projectId: string
    token?: string
}

export type EditListFormData = {
    id: string
    projectId: string
    title: string
    position: number
    token?: string
}

export type MoveListFormData = {
    projectId: string
    activeListId: UniqueIdentifier
    overListId: UniqueIdentifier
    activeListPosition: number
    overListPosition: number
    updatedLists: object
    token?: string
}

export type DeleteListFormData = {
    id: string
    projectId: string
    token?: string
}

export type CreateCardFormData = {
    listId: string
    title: string
    position: number
    projectId: string
    token?: string
}

export type DeleteCardFormData = {
    id: string
    projectId: string
    token?: string
}

export type List = {
    id: string
    title: string
    position: number
}

export type Card = {
    id: string
    title: string
    description: string
    position: number
    listId: string
    dueDate: string
    updatedAt: string
}

export type CreateBoardCardFormData = {
    title: string
}

export type EditBoardCardFormData = {
    id: string
    listId: string
    projectId: string
    title?: string
    description?: string
    dueDate?: string
    token?: string
}
