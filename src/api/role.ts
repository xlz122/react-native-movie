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

/**
 * @description 关注角色
 * @param { Number } id - 角色id
 */
export const followRole = ({ id }: { id: number }) => {
  return axios.request({
    url: `/user/roles/${id}/collections`,
    method: 'post'
  });
};

/**
 * @description 取消关注角色
 * @param { Number } id - 角色id
 */
export const unFollowRole = ({ id }: { id: number }) => {
  return axios.request({
    url: `/user/roles/${id}/collections`,
    method: 'delete'
  });
};
