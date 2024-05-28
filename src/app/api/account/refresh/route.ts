import withErrorHandler from "@/apiHandlers/withErrorHandler"
import pool from "@/db"
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/request"
import jwt from "jsonwebtoken"


export const POST = withErrorHandler(async (request) => {
  const body = await request.json()
  const { rt } = body

  try {
    const res = jwt.verify(rt, process.env.REFRESH_TOKEN_SECRET!)
    console.log(res)
    // 重新生成 双token
    if (typeof res !== 'string') {
      const { username, password } = res
      const at = jwt.sign({ username, password }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1m' })
      const rt = jwt.sign({ username, password }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '30d' })

      return [null, { headers: { 'set-cookie': `${ACCESS_TOKEN_KEY}=${at};PATH=/`, [REFRESH_TOKEN_KEY]: rt } }]
    }
  } catch (error) {
    console.log('rt无效')
    throw new Error('未登录', { cause: 401 })
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

  return [1]
})
