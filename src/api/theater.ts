import axios from '../utils/axios';

export type TheaterParams = {
  page: number;
  per_page: number;
};

/**
 * @description 正在热映影片
 */
export const theaterData = ({ page, per_page }: TheaterParams) => {
  const params = { page, per_page };

  return axios.request({
    url: '/movie/theater',
    method: 'get',
    params
  });
};
