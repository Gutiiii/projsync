import { BACKEND_URL } from "@/lib/constants";
import { AcceptInvitationFormData } from "@/types/project.types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAcceptInvitation = async (values: AcceptInvitationFormData) => {
    const { token, ...data } = values
    return await axios.post(BACKEND_URL + '/project/invite/accept', data, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer " + token
        },
    });
}