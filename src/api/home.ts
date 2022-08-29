import axios from '../utils/axios';

/**
 * @description 首页内容聚合接口,包含 swiper, coming, theater, today, article
 */
export const index = () => {
  return axios.request({
    url: '/index',
    method: 'get'
  });
};
