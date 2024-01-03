
import { BACKEND_URL } from "@/lib/constants";
import { DeleteInvitationFormData } from "@/types/project.types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteInvitation = async (values: DeleteInvitationFormData) => {
    return await axios.delete(BACKEND_URL + '/project/invitation/' + values.invitationId, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer " + values.token
        },
    });
}