import { success } from "@/apiHandlers/resultUtils"
import pool from "@/db"
import { ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET } from "@/request"
import * as jose from 'jose'
import { User } from "../account/login/route"

const noLoginData = {
  id: null,
  username: null,
  nick: null,
  avatar: null,
  loggedIn: false,
}

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
  }, {} as { [key: string]: string | undefined })

  // 获取accessToken
  const at = cookies?.[ACCESS_TOKEN_KEY]

  if (!at) {
    // 没有accessToken 未登录处理
    return success(noLoginData)
  }

  try {
    const { payload: { username, password } } = await jose.jwtVerify(at, ACCESS_TOKEN_SECRET)

    const [result] = await pool.query(`SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`)

    if (result instanceof Array) {
      const { password, ...userInfo } = result[0] as User
      return success({ ...userInfo, loggedIn: true })
    }
  } catch (error) {
    return success(noLoginData)
  }

  return success(noLoginData)
}
