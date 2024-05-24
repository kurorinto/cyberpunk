import withErrorHandler from "@/apiHandlers/withErrorHandler";
import pool from "@/db";

export const POST = withErrorHandler(async (request) => {
  const body = await request.json();
  const { username, password } = body;

  const [result] = await pool.query(`SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`);

  // 未查询到
  if (result instanceof Array ? !result.length : !result) {
    throw new Error('用户名或密码错误');
  }

  return result instanceof Array ? result[0] : result;
});
