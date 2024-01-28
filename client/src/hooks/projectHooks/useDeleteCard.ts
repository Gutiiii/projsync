
import { BACKEND_URL } from "@/lib/constants";
import { DeleteCardFormData } from "@/types/project.types";
import axios from "axios";

export const useDeleteCard = async (values: DeleteCardFormData) => {
    return await axios.delete(BACKEND_URL + '/project/card/' + values.id + "/" + values.projectId, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer " + values.token
        },
    });
}