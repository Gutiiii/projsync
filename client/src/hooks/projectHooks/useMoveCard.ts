import { BACKEND_URL } from '@/lib/constants';
import { MoveCardFormData } from '@/types/project.types';
import axios from 'axios';

export const useMoveCard = async (values: MoveCardFormData) => {
    const { token, projectId, updatedCards, ...data } = values;
    const res = await axios.patch(BACKEND_URL + '/project/card/move/' + projectId, data, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
        },
    });
    return res.data
};