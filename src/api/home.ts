import axios from '../utils/axios';

/**
 * @description 首页内容聚合接口,包含 swiper, coming, theater, today, article
 */
export const indexData = () => {
  return axios.request({
    url: '/index',
    method: 'get'
  });
};

export type PagingParams = {
  page: number;
  per_page: number;
};

/**
 * @description 正在热映影片
 */
export const movieTheater = ({ page, per_page }: PagingParams) => {
  const params = { page, per_page };

  return axios.request({
    url: '/movie/theater',
    method: 'get',
    params
  });
};

/**
 * @description 最受欢迎的100部影片
 */
export const movieTop = ({ page, per_page }: PagingParams) => {
  const params = { page, per_page };

  return axios.request({
    url: '/movie/top',
    method: 'get',
    params
  });
};
