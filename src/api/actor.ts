import axios from '@/utils/axios';

/**
 * @description 影人详情
 * @param { Number } id - 影人id
 */
export const actorsDetail = ({ id }: { id: number }) => {
  const params = { id };

  return axios.request({
    url: `/actors/${id}`,
    method: 'get',
    params
  });
};

/**
 * @description 关注影人
 * @param { Number } id - 影人id
 */
export const followActor = ({ id }: { id: number }) => {
  return axios.request({
    url: `/user/actors/${id}/collections`,
    method: 'post'
  });
};

/**
 * @description 取消关注影人
 * @param { Number } id - 影人id
 */
export const unFollowActor = ({ id }: { id: number }) => {
  return axios.request({
    url: `/user/actors/${id}/collections`,
    method: 'delete'
  });
};

type ActorPhotosParams = {
  id: number;
  type: string;
  page: number;
  per_page: number;
};

/**
 * @description 影人详情 - 相册列表
 * @param { Number } id - 影人id
 * @param { String } type - 照片类型(all全部, portrait写真, cut截图, other其它)
 * @param { Number } page - 页数
 * @param { Number } per_page - 条数
 */
export const actorPhotos = ({
  id,
  type,
  page,
  per_page
}: ActorPhotosParams) => {
  const params = { id, type, page, per_page };

  return axios.request({
    url: `/actors/${id}/photos`,
    method: 'get',
    params
  });
};

type ActorWorksParams = {
  id: number;
  sortby: string;
  page: number;
  per_page: number;
};

/**
 * @description 影人详情 - 作品列表
 * @param { Number } id - 影人id
 * @param { String } sortby - 排序方式(hot热度, year时间, rating评分)
 * @param { Number } page - 页数
 * @param { Number } per_page - 条数
 */
export const actorWorks = ({
  id,
  sortby,
  page,
  per_page
}: ActorWorksParams) => {
  const params = { id, sortby, page, per_page };

  return axios.request({
    url: `/actors/${id}/works`,
    method: 'get',
    params
  });
};
