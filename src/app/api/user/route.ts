import { success } from "@/apiHandlers/resultUtils"
import { ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET } from "@/request"
import * as jose from 'jose'

export const GET = async (request: Request) => {
  // 获取页面的cookie
  const cookies = request.headers.get('cookie')?.split(';').map(item => item.trim()).reduce((res, item, index) => {
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
  const { payload: { exp, ...userInfo } } = await jose.jwtVerify(at, ACCESS_TOKEN_SECRET)

  return success(userInfo)
}
