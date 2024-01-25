import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { BACKEND_URL } from '@/lib/constants';
import { CreateListFormData, } from '@/types/project.types';
import axios from 'axios';

export const useCreateList = async (values: CreateListFormData) => {
    const { token, ...data } = values
    console.log(data)
    return await axios.post(BACKEND_URL + '/project/list', data, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer " + token
        },
    });
};
