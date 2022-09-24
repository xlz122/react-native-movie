import axios from '../utils/axios';

/**
 * @description 获取影人详情
 * @param { Number } id - 影人id
 */
export const actorsDetail = ({ id }: { id: number }) => {
  const params = { id };

  return axios.request({
    url: `/actors/${id}`,
    method: 'get',
    params
  });
};
