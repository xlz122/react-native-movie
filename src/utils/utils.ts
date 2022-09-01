/**
 * @description 16进制颜色值转换成rgba
 */
export const colorToRgba = function (color: string, alpha: number): string {
  // 16进制颜色值的正则
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

  // 把颜色值变成小写
  color = color.toLowerCase();

  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      let colorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }

    // 处理六位的颜色值，转为rgba
    const colorChange = [];
    for (let i = 1; i < 7; i += 2) {
      // @ts-ignore
      colorChange.push(parseInt('0x' + color.slice(i, i + 2)));
    }

    return `rgba(${colorChange.join(',')},${alpha})`;
  }

  return color;
};

/**
 * @description 时间戳转视频时长
 * @return { String } 视频时长 01:23:45
 */
export function timeStampToDuration(timeStamp: number): string {
  const time = timeStamp.toString();
  let h = 0,
    i = 0,
    s = parseInt(time);

  if (s > 60) {
    i = parseInt((s / 60).toString());
    s = parseInt((s % 60).toString());
    if (i > 60) {
      h = parseInt((i / 60).toString());
      i = parseInt((i % 60).toString());
    }
  }

  // 补零
  const zero = function (v: number) {
    return v >> 0 < 10 ? '0' + v : v;
  };
  const h2 = zero(h);
  const i2 = zero(i);
  const s2 = zero(s);

  let ok = '';
  if (h2 <= 0) {
    ok = [i2, s2].join(':');
  } else {
    ok = [h2, i2, s2].join(':');
  }

  return ok;
}
