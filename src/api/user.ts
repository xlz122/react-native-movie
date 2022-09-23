import axios from '../utils/axios';

export type LoginParams = {
  account: string;
  password: string;
  code?: string;
};

/**
 * @description 登录
 * @param { String } account - 账号
 * @param { String } password - 密码
 */
export const login = ({ account, password }: LoginParams) => {
  const data = { account, password };

  return axios.request({
    url: '/login',
    method: 'post',
    data
  });
};

/**
 * @description 注册
 * @param { String } account - 账号
 * @param { String } password - 密码
 * @param { String } code - 验证码
 */
export const register = ({ account, password, code }: LoginParams) => {
  const data = { account, password, code };

  return axios.request({
    url: '/register',
    method: 'post',
    data
  });
};

/**
 * @description 发送短信验证码
 */
export const phoneCode = ({ phone }) => {
  const data = { phone };

  return axios.request({
    url: '/code',
    method: 'post',
    data
  });
};

/**
 * @description 用户信息
 */
export const userinfo = () => {
  return axios.request({
    url: '/user',
    method: 'get'
  });
};
