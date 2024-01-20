import { BACKEND_URL } from '@/lib/constants';
import { EditProjectFormData } from '@/types/project.types';
import axios from 'axios';

export const useEditProject = async (values: EditProjectFormData) => {
  const { token, id, ...data } = values;
  return await axios.patch(BACKEND_URL + '/project/' + id, data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
};
