import { BACKEND_URL } from '@/lib/constants';
import { MoveListFormData } from '@/types/project.types';
import axios from 'axios';

export const useMoveList = async (values: MoveListFormData) => {
    const { token, projectId, ...data } = values;
    return await axios.patch(BACKEND_URL + '/project/list/move/' + projectId, data, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
        },
    });
};
