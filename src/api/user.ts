import axios from '@/utils/axios';

type LoginParams = {
  account: string;
  password: string;
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

type RegisterParams = {
  account: string;
  password: string;
  code: string;
};

/**
 * @description 注册
 * @param { String } account - 账号
 * @param { String } password - 密码
 * @param { String } code - 验证码
 */
export const register = ({ account, password, code }: RegisterParams) => {
  const data = { account, password, code };

  return axios.request({
    url: '/register',
    method: 'post',
    data
  });
};

/**
 * @description 校验账号是否存在
 * @param { String } account - 账号
 */
export const fieldAccount = ({ account }: { account: string }) => {
  const data = { account };

  return axios.request({
    url: '/account',
    method: 'post',
    data
  });
};

/**
 * @description 图片验证码
 */
export const getCaptcha = () => {
  return axios.request({
    url: '/captcha',
    method: 'get'
  });
};

type FiledCaptcha = {
  phone: string;
  code: string;
  type: string;
};

/**
 * @description 校验图片验证码并发送短信验证码
 * @param { String } phone - 手机号
 * @param { String } code - 图片验证码
 * @param { String } type - 类型(注册: register, 找回密码: forget)
 */
export const filedCaptcha = ({ phone, code, type }: FiledCaptcha) => {
  const params = { phone, code, type };

  return axios.request({
    url: '/code',
    method: 'get',
    params
  });
};

type FiledPhoneCode = {
  phone: string;
  code: string;
};

/**
 * @description 校验短信验证码
 * @param { String } phone - 手机号
 * @param { String } code - 手机验证码
 */
export const filedPhoneCode = ({ phone, code }: FiledPhoneCode) => {
  const data = { phone, code };

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

/**
 * @description 修改密码
 * @param { String } password - 新密码
 */
export const modifyPassword = ({ password }: { password: string }) => {
  const data = { password };

  return axios.request({
    url: '/user/password',
    method: 'put',
    data
  });
};
