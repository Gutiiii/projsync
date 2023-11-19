import { BACKEND_URL } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useAddPasswordResetCode = (id: string | undefined) => {
  return useQuery({
    queryKey: ['addPasswordResetCode'],
    queryFn: async () => {
      return await axios.get(BACKEND_URL + '/auth/addpasswordresetcode/' + id, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
    },
  });
};
