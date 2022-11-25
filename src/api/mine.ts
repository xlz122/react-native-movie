import axios from '@/utils/axios';

/**
 * @description 我的收藏统计数据
 */
export const userCount = () => {
  return axios.request({
    url: '/user/collections/count',
    method: 'get'
  });
};

export type BaseParams = {
  page: number;
  per_page: number;
};

/**
 * @description 用户关注的影人
 */
export const userActors = ({ page, per_page }: BaseParams) => {
  const params = { page, per_page };

  return axios.request({
    url: '/user/collections/actors',
    method: 'get',
    params
  });
};

/**
 * @description 用户关注的角色
 */
export const userRoles = ({ page, per_page }: BaseParams) => {
  const params = { page, per_page };

  return axios.request({
    url: '/user/collections/roles',
    method: 'get',
    params
  });
};

/**
 * @description 用户收藏的视频
 */
export const userVideos = ({ page, per_page }: BaseParams) => {
  const params = { page, per_page };

  return axios.request({
    url: '/user/collections/videos',
    method: 'get',
    params
  });
};
