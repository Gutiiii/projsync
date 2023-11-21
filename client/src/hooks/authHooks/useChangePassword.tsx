import { BACKEND_URL } from '@/lib/constants';
import axios from 'axios';

export const useChangePassword = async (values: {
  password: string;
  code: string;
}) => {
  return await axios.post(BACKEND_URL + '/auth/changepassword', values, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};
