import axios from '@/utils/axios';

export type VideoParams = {
  page: number;
  per_page: number;
};

/**
 * @description 视频列表
 * @param { Number } page - 页数
 * @param { Number } per_page - 条数
 */
export const videosList = ({ page, per_page }: VideoParams) => {
  const params = { page, per_page };

  return axios.request({
    url: '/videos',
    method: 'get',
    params
  });
};
