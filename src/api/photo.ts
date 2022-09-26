import axios from '@/utils/axios';

/**
 * @description 获取图片详情
 * @param { Number } id - 图片id
 */
export const photosDetail = ({ id }: { id: number }) => {
  const params = { id };

  return axios.request({
    url: `/photos/${id}`,
    method: 'get',
    params
  });
};
