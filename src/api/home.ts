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
  sortby?: string;
};

/**
 * @description 正在热映影片
 * @param { Number } page - 页数
 * @param { Number } per_page - 条数
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
 * @param { Number } page - 页数
 * @param { Number } per_page - 条数
 */
export const movieTop = ({ page, per_page }: PagingParams) => {
  const params = { page, per_page };

  return axios.request({
    url: '/movie/top',
    method: 'get',
    params
  });
};

/**
 * @description 影视奖项列表
 */
export const movieAwards = () => {
  return axios.request({
    url: '/awards',
    method: 'get'
  });
};

/**
 * @description 历史上的今天上映的影片
 * @param { Number } page - 页数
 * @param { Number } per_page - 条数
 * @param { String } sortby - 排序方式
 */
export const movieToday = ({ page, per_page, sortby }: PagingParams) => {
  const params = { page, per_page, sortby };

  return axios.request({
    url: '/movie/today',
    method: 'get',
    params
  });
};
