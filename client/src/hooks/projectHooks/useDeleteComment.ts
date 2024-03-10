
import { BACKEND_URL } from "@/lib/constants";
import { DeleteCommentFormData } from "@/types/project.types";
import axios from "axios";

export const useDeleteComment = async (values: DeleteCommentFormData) => {
    return await axios.delete(BACKEND_URL + '/project/comment/' + values.commentId, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer " + values.token
        },
    });
}