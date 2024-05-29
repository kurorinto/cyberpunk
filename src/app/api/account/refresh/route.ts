import { failure, success } from "@/apiHandlers/resultUtils"
import { ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_KEY, REFRESH_TOKEN_SECRET } from "@/request"
import * as jose from 'jose'

export const POST = async (request: Request) => {
  const body = await request.json()
  const { rt } = body

  try {
    // 校验刷新token
    const res = await jose.jwtVerify(rt, REFRESH_TOKEN_SECRET)
    // 校验成功 重新生成双token
    if (typeof res !== 'string') {
      const { username, password } = res.payload
      const at = await new jose.SignJWT({ username, password }).setExpirationTime('1m').setProtectedHeader({ alg: 'HS256' }).sign(ACCESS_TOKEN_SECRET)
      const rt = await new jose.SignJWT({ username, password }).setExpirationTime('30d').setProtectedHeader({ alg: 'HS256' }).sign(REFRESH_TOKEN_SECRET)

      return success(null, { headers: { 'set-cookie': `${ACCESS_TOKEN_KEY}=${at};PATH=/`, [REFRESH_TOKEN_KEY]: rt } })
    }
  } catch (error) {
    console.log('refresh error:', error)
    // 校验失败 重新登录
    return failure({ message: '未登录', code: 401 })
  }

  return success(null)
}
