import { failure, success } from "@/apiHandlers/resultUtils"
import pool from "@/db"
import { ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET } from "@/request"
import * as jose from 'jose'
import { User } from "../account/login/route"

export const GET = async (request: Request) => {
  // 获取页面的cookie
  const cookies = request.headers.get('cookie')?.split(';').map(item => item.trim()).reduce((res, item) => {
    const splitIndex = item.indexOf('=')
    if (splitIndex !== -1) {
      const key = item.slice(0, splitIndex)
      const value = item.slice(splitIndex + 1)
      res[key] = value
    }
    return res
  }, {} as any)

  // 获取accessToken
  const at = cookies?.[ACCESS_TOKEN_KEY]
  const { payload: { exp, username, password } } = await jose.jwtVerify(at, ACCESS_TOKEN_SECRET)

  const [result] = await pool.query(`SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`)

  if (result instanceof Array) {
    const { password, ...userInfo } = result[0] as User
    return success(userInfo)
  }

  return failure('获取用户信息失败')
}
