/**
 * @description 获取值的原始类型字符串
 */
const _toString = Object.prototype.toString;
export function toRawType(value: unknown): string {
  return _toString.call(value).slice(8, -1);
}
