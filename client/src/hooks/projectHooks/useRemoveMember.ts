import { BACKEND_URL } from "@/lib/constants";
import { RemoveMemberFormData } from "@/types/project.types";
import axios from "axios";

export const useRemoveMember = async (values: RemoveMemberFormData) => {
    const { token, ...data } = values
    return await axios.delete(BACKEND_URL + '/project/member/' + data.userProjectId, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer " + values.token
        },
    });
}