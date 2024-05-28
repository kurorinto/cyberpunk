import jwt from "jsonwebtoken"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { ACCESS_TOKEN_KEY } from "./request"

// This function can be marked `async` if using `await` inside
export const middleware = (request: NextRequest) => {
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
    console.log('没有at')
    return NextResponse.json({ success: false, result: null, message: '未登录', code: 401 }, { headers: { 'set-cookie': `${ACCESS_TOKEN_KEY}=;PATH=/;MAX-AGE=0` } })
  }

  try {
    const res = jwt.verify(at, process.env.ACCESS_TOKEN_SECRET!)
    console.log(res)
  } catch (error) {
    console.log('at无效')
    return NextResponse.json({ success: false, result: null, message: '登录已失效', code: 402 }, { headers: { 'set-cookie': `${ACCESS_TOKEN_KEY}=;PATH=/;MAX-AGE=0` } })
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/test/:path*"],
}
