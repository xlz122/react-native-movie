import axios from '../utils/axios';

/**
 * @description 获取影视分类菜单
 */
export const categoriesData = () => {
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
 * @description 获取影视列表
 */
export const moviesData = ({
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
