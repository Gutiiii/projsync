import { BACKEND_URL } from '@/lib/constants';
import { CreateProjectFormData } from '@/types/project.types';
import axios from 'axios';

export const useChangePassword = async (values: CreateProjectFormData) => {
  const { token, ...data } = values;
  return await axios.post(BACKEND_URL + '/project', data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + values.token,
    },
  });
};
