import { BACKEND_URL } from '@/lib/constants';
import { EditCommentFormData } from '@/types/project.types';
import axios from 'axios';

export const useEditComment = async (values: EditCommentFormData) => {
    const { token, commentId, ...data } = values;
    return await axios.patch(BACKEND_URL + '/project/comment/' + commentId, data, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
        },
    });
};
