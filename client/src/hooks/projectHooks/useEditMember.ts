import { BACKEND_URL } from "@/lib/constants";
import { EditMemberFormData } from "@/types/project.types";
import axios from "axios";

export const useEditMember = async (values: EditMemberFormData) => {
    const { token, ...data } = values
    return await axios.patch(BACKEND_URL + '/project/member', data, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer " + values.token
        },
    });
}