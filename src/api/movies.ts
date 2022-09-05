import axios from '../utils/axios';

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
 * @description 获取影视详情
 */
export const moviesDetail = ({ id }: { id: number }) => {
  const params = { id };

  return axios.request({
    url: `/movies/${id}`,
    method: 'get',
    params
  });
};
