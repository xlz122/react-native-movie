import axios from '@/utils/axios';

export type SearchParams = {
  keyword: string;
  type: string;
  page: number;
  per_page: number;
};

/**
 * @description 影视/影人/角色信息查询
 * @param { Number } keyword - 查询关键字
 * @param { Number } type - 类别
 * @param { Number } page - 图片id
 * @param { Number } per_page - 图片id
 */
export const searchDetail = ({
  keyword,
  type,
  page,
  per_page
}: SearchParams) => {
  const params = { keyword, type, page, per_page };

  return axios.request({
    url: '/search',
    method: 'get',
    params
  });
};
