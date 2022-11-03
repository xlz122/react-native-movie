import axios from '@/utils/axios';

/**
 * @description 影人详情
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

/**
 * @description 关注影人
 * @param { Number } id - 影人id
 */
export const followActor = ({ id }: { id: number }) => {
  return axios.request({
    url: `/user/actors/${id}/collections`,
    method: 'post'
  });
};

/**
 * @description 取消关注影人
 * @param { Number } id - 影人id
 */
export const unFollowActor = ({ id }: { id: number }) => {
  return axios.request({
    url: `/user/actors/${id}/collections`,
    method: 'delete'
  });
};
