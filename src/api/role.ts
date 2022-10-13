import axios from '@/utils/axios';

/**
 * @description 角色详情
 * @param { Number } id - 角色id
 */
export const roleDetail = ({ id }: { id: number }) => {
  const params = { id };

  return axios.request({
    url: `/roles/${id}`,
    method: 'get',
    params
  });
};
