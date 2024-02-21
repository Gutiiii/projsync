import { BACKEND_URL } from '@/lib/constants';
import { CreateCommentFormData } from '@/types/project.types';
import axios from 'axios';

export const useCreateComment = async (values: CreateCommentFormData) => {
    const { token, ...data } = values
    return await axios.post(BACKEND_URL + '/project/comment', data, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer " + values.token
        },
    });
};
