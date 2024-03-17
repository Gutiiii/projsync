import { BACKEND_URL } from '@/lib/constants';
import { MoveCardFormData } from '@/types/project.types';
import axios from 'axios';

export const useMoveCard = async (values: MoveCardFormData) => {

    return { status: 200 }
    // const { token, projectId, updatedLists, ...data } = values;
    // const res = await axios.patch(BACKEND_URL + '/project/list/move/' + projectId, data, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Accept: 'application/json',
    //         Authorization: 'Bearer ' + token,
    //     },
    // });
    // return res.data
};