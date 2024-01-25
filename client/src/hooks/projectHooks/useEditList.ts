import { BACKEND_URL } from '@/lib/constants';
import { EditListFormData } from '@/types/project.types';
import axios from 'axios';

export const useEditList = async (values: EditListFormData) => {
    const { token, id, ...data } = values;
    return await axios.patch(BACKEND_URL + '/project/list/' + id, data, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
        },
    });
};
