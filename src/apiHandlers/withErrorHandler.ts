import { ACCESS_TOKEN_KEY, CODE } from "@/request"

type ExecutorResult = Promise<Parameters<typeof Response.json>>

const withErrorHandler = (executor: (request: Request) => ExecutorResult) => async (request: Request) => {
  try {
    const [result, init] = await executor(request) ?? null
    return Response.json({ success: true, result, message: null, code: null }, init)
  } catch (err) {
    if (err instanceof Error) {
      const { message, cause } = err
      const code = cause as CODE || 500
      let init: ResponseInit | undefined = undefined
      switch (code) {
        case 401:
          // 清除accessToken
          init = { headers: { 'set-cookie': `${ACCESS_TOKEN_KEY}=;PATH=/;MAX-AGE=0` } }
          break
        case 402:
          // 清除accessToken
          init = { headers: { 'set-cookie': `${ACCESS_TOKEN_KEY}=;PATH=/;MAX-AGE=0` } }
          break
        default:
          break
      }
      return Response.json({ success: false, result: null, message: message || null, code }, init)
    }
    return Response.json({ success: false, result: null, message: null, code: 500 })
  }
}

export default withErrorHandler
