
import { BACKEND_URL } from "@/lib/constants";
import { DeleteListFormData, DeleteProjectFormData } from "@/types/project.types";
import axios from "axios";

export const useDeleteList = async (values: DeleteListFormData) => {
    return await axios.delete(BACKEND_URL + '/project/list/' + values.id + "/" + values.projectId, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer " + values.token
        },
    });
}