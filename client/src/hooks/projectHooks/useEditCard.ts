import { BACKEND_URL } from '@/lib/constants';
import { EditBoardCardFormData } from '@/types/project.types';
import axios from 'axios';

export const useEditCard = async (values: EditBoardCardFormData) => {
    const { token, id, ...data } = values;
    return await axios.patch(BACKEND_URL + '/project/card/' + id, data, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
        },
    });
};
