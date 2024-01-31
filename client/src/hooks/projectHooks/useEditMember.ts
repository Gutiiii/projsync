import { BACKEND_URL } from "@/lib/constants";
import { EditMemberFormData } from "@/types/project.types";
import axios from "axios";

export const useEditMember = async (values: EditMemberFormData) => {
    const { token, userProjectId, ...data } = values
    return await axios.patch(BACKEND_URL + '/project/member/' + userProjectId, data, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer " + values.token
        },
    });
}