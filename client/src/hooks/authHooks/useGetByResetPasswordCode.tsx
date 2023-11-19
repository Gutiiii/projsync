import { BACKEND_URL } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetByResetPasswordCode = (token: string | undefined) => {
  return useQuery({
    queryKey: ['getByResetPasswordCode'],
    retry: 2,
    queryFn: async () => {
      return await axios.get(
        BACKEND_URL + '/auth/findbyresetpasswordcode/' + token,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
    },
  });
};
