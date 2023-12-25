import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { BACKEND_URL } from '@/lib/constants';
import { CreateInvitationFormData, CreateProjectFormData } from '@/types/project.types';
import axios from 'axios';
import { getServerSession } from 'next-auth';

export const useCreateInvitation = async (values: CreateInvitationFormData) => {
    const { token, ...data } = values
    return await axios.post(BACKEND_URL + '/project/invite', data, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer " + token
        },
    });
};
