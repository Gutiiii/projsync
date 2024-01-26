import { BACKEND_URL } from '@/lib/constants';
import { CreateCardFormData } from '@/types/project.types';
import axios from 'axios';

export const useCreateCard = async (values: CreateCardFormData) => {
    const { token, ...data } = values
    return await axios.post(BACKEND_URL + '/project/card', data, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer " + token
        },
    });
};
