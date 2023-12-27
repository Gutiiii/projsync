import { BACKEND_URL } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetByInvitationId = (id: string | undefined) => {
    return useQuery({
        queryKey: ['getByInvitationId'],
        queryFn: async () => {
            return await axios.get(BACKEND_URL + '/project/invitation/' + id);
        },
    });
};
