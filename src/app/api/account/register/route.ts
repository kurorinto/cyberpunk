import { failure, success } from "@/apiHandlers/resultUtils"
import pool from "@/db"
import { ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_KEY, REFRESH_TOKEN_SECRET } from "@/request"
import * as jose from 'jose'

export const POST = async (request: Request) => {
  // const body = await request.json()
  // const { username, password } = body

  // const [result] = await pool.query(`SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`)

  // if (!(result instanceof Array)) {
  //   // todo: 后续再看是否需要清除登录态
  //   return failure('数据错误')
  // }

  // // 未查询到
  // if (!result.length) {
  //   // todo: 后续再看是否需要清除登录态
  //   return failure('用户名或密码错误')
  // }

  // // 账号正确 生成双token
  // const at = await new jose.SignJWT({ username, password }).setExpirationTime('1m').setProtectedHeader({ alg: 'HS256' }).sign(ACCESS_TOKEN_SECRET)
  // const rt = await new jose.SignJWT({ username, password }).setExpirationTime('30d').setProtectedHeader({ alg: 'HS256' }).sign(REFRESH_TOKEN_SECRET)

  // return success(null, { headers: { 'set-cookie': `${ACCESS_TOKEN_KEY}=${at};PATH=/`, [REFRESH_TOKEN_KEY]: rt } })
  return failure('null')
}
