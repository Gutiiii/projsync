
import { BACKEND_URL } from "@/lib/constants";
import { DeleteProjectFormData } from "@/types/project.types";
import axios from "axios";

export const useDeleteProject = async (values: DeleteProjectFormData) => {
    return await axios.delete(BACKEND_URL + '/project/' + values.id, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer " + values.token
        },
    });
}