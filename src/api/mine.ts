import axios from '@/utils/axios';

/**
 * @description 获取我的收藏统计数据
 */
export const userCount = () => {
  return axios.request({
    url: '/user/collections/count',
    method: 'get'
  });
};

export type CollectionParams = {
  page: number;
  per_page: number;
};

/**
 * @description 获取用户关注的影人
 */
export const userActors = ({ page, per_page }: CollectionParams) => {
  const params = { page, per_page };

  return axios.request({
    url: '/user/collections/actors',
    method: 'get',
    params
  });
};
