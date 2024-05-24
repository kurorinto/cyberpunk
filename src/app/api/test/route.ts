import withErrorHandler from "@/apiHandlers/withErrorHandler";
import pool from "@/db";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/request";
import jwt from "jsonwebtoken";

export const POST = withErrorHandler(async (request) => {
  const cookies = request.headers.get('cookie')?.split(';').map(item => item.trim()).reduce((res, item, index) => {
    const splitIndex = item.indexOf('=');
    if (splitIndex !== -1) {
      const key = item.slice(0, splitIndex);
      const value = item.slice(splitIndex + 1);
      res[key] = value;
    }
    return res;
  }, {} as any);

  const at = cookies?.[ACCESS_TOKEN_KEY] || '';

  if (!at) {
    throw new Error('未登录', { cause: 401 });
  }

  try {
    const res = jwt.verify(at, process.env.ACCESS_TOKEN_SECRET!);
    console.log(res);
  } catch (error) {
    console.log('at无效');
    throw new Error('登录已失效', { cause: 402 });
  }
  
  // const [result] = await pool.query(`SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`);

  // if (!(result instanceof Array)) throw new Error('数据错误');

  // // 未查询到
  // if (!result.length) {
  //   throw new Error('用户名或密码错误');
  // }

  // // 账号正确 生成双token
  // const accessToken = jwt.sign({ username, password }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1m' });
  // const refreshToken = jwt.sign({ username, password }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '30d' });

  return [null];
});
