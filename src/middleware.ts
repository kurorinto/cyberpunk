import * as jose from 'jose'
import type { NextRequest } from "next/server"
import { next, nextFailure } from "./apiHandlers/resultUtils"
import { ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET } from "./request"

// This function can be marked `async` if using `await` inside
export const middleware = async (request: NextRequest) => {
  const cookies = request.headers.get('cookie')?.split(';').map(item => item.trim()).reduce((res, item, index) => {
    const splitIndex = item.indexOf('=')
    if (splitIndex !== -1) {
      const key = item.slice(0, splitIndex)
      const value = item.slice(splitIndex + 1)
      res[key] = value
    }
    return res
  }, {} as any)

  const at = cookies?.[ACCESS_TOKEN_KEY]

  if (!at) {
    return nextFailure({ message: '未登录', code: 401 }, { headers: { 'set-cookie': `${ACCESS_TOKEN_KEY}=;PATH=/;MAX-AGE=0` } })
  }

  try {
    const res = await jose.jwtVerify(at, ACCESS_TOKEN_SECRET)
    console.log(res)
  } catch (error) {
    console.log('error', error)
    return nextFailure({ message: '登录已失效', code: 402 }, { headers: { 'set-cookie': `${ACCESS_TOKEN_KEY}=;PATH=/;MAX-AGE=0` } })
  }

  console.log('success')
  return next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/test/:path*"],
}
