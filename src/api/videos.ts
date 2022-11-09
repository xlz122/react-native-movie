import axios from '@/utils/axios';

export type VideoParams = {
  page: number;
  per_page: number;
};

/**
 * @description 视频列表
 * @param { Number } page - 页数
 * @param { Number } per_page - 条数
 */
export const videosList = ({ page, per_page }: VideoParams) => {
  const params = { page, per_page };

  return axios.request({
    url: '/videos',
    method: 'get',
    params
  });
};

/**
 * @description 视频详情
 * @param { Number } id - 视频id
 */
export const videosDetail = ({ id }: { id: number }) => {
  const params = { id };

  return axios.request({
    url: `/videos/${id}`,
    method: 'get',
    params
  });
};

/**
 * @description 视频详情 - 视频列表
 * @param { Number } id - 视频id
 */
export const videosDetailList = ({ id }: { id: number }) => {
  const params = { id };

  return axios.request({
    url: `/movies/${id}/videos`,
    method: 'get',
    params
  });
};

/**
 * @description 视频详情 - 点赞
 * @param { Number } id - 视频id
 */
export const videoLike = ({ id }: { id: number }) => {
  return axios.request({
    url: `/videos/${id}/like`,
    method: 'post'
  });
};

/**
 * @description 视频详情 - 取消点赞
 * @param { Number } id - 视频id
 */
export const unVideoLike = ({ id }: { id: number }) => {
  return axios.request({
    url: `/videos/${id}/like`,
    method: 'delete'
  });
};

/**
 * @description 视频详情 - 收藏
 * @param { Number } id - 影人id
 */
export const followVideo = ({ id }: { id: number }) => {
  return axios.request({
    url: `/user/videos/${id}/collections`,
    method: 'post'
  });
};

/**
 * @description 视频详情 - 取消收藏
 * @param { Number } id - 影人id
 */
export const unFollowVideo = ({ id }: { id: number }) => {
  return axios.request({
    url: `/user/videos/${id}/collections`,
    method: 'delete'
  });
};
