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
