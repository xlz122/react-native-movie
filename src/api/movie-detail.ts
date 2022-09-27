import axios from '@/utils/axios';

/**
 * @description 获取影视详情
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
 * @description 新增或删除我的想看
 * @param { Number } id - 影视id
 */
export const movieWish = ({ id }: { id: number }) => {
  return axios.request({
    url: `/user/movies/${id}/wish`,
    method: 'post'
  });
};

/**
 * @description 获取影视演员列表
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
 * @description 获取影视相册列表
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
