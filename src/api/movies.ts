import axios from '@/utils/axios';

/**
 * @description 影视分类菜单
 */
export const movieCategories = () => {
  return axios.request({
    url: '/categories',
    method: 'get'
  });
};

export type MovieParams = {
  page: number;
  per_page: number;
  category: string;
  genre: string;
  country: string;
  year: string;
};

/**
 * @description 影视列表
 * @param { Number } page - 页数
 * @param { Number } per_page - 条数
 * @param { String } category - 类别
 * @param { String } genre - 分类
 * @param { String } country - 国家
 * @param { String } year - 年份
 */
export const moviesList = ({
  page,
  per_page,
  category,
  genre,
  country,
  year
}: MovieParams) => {
  const params = { page, per_page, category, genre, country, year };

  return axios.request({
    url: '/movies',
    method: 'get',
    params
  });
};

/**
 * @description 影视详情
 * @param { Number } id - 影视id
 */
export const moviesDetail = ({ id }: { id: number }) => {
  const params = { id };

  return axios.request({
    url: `/movies/${id}`,
    method: 'get',
    params
  });
};

export type MoviePhotosParams = {
  id: number;
  type: string;
  page: number;
  per_page: number;
};

/**
 * @description 影视详情 - 新增或删除我的想看
 * @param { Number } id - 影视id
 */
export const movieWish = ({ id }: { id: number }) => {
  return axios.request({
    url: `/user/movies/${id}/wish`,
    method: 'post'
  });
};

/**
 * @description 影视详情 - 演员列表
 * @param { Number } id - 影视id
 */
export const movieActor = ({ id }: { id: number }) => {
  const params = { id };

  return axios.request({
    url: `/movies/${id}/cast`,
    method: 'get',
    params
  });
};

/**
 * @description 影视详情 - 相册列表
 * @param { Number } id - 影视id
 * @param { String } type - 照片类型(all全部, poster海报, still剧照, cut截图, other其它)
 * @param { Number } page - 页数
 * @param { Number } per_page - 条数
 */
export const moviePhotos = ({
  id,
  type,
  page,
  per_page
}: MoviePhotosParams) => {
  const params = { id, type, page, per_page };

  return axios.request({
    url: `/movies/${id}/photos`,
    method: 'get',
    params
  });
};
