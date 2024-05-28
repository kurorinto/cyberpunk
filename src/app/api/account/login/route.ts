import withErrorHandler from "@/apiHandlers/withErrorHandler"
import pool from "@/db"
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/request"
import jwt from "jsonwebtoken"

export const POST = withErrorHandler(async (request) => {
  const body = await request.json()
  const { username, password } = body

  const [result] = await pool.query(`SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`)

  if (!(result instanceof Array)) throw new Error('数据错误')

  // 未查询到
  if (!result.length) {
    throw new Error('用户名或密码错误')
  }

  // 账号正确 生成双token
  const at = jwt.sign({ username, password }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1m' })
  const rt = jwt.sign({ username, password }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '30d' })

  return [null, { headers: { 'set-cookie': `${ACCESS_TOKEN_KEY}=${at};PATH=/`, [REFRESH_TOKEN_KEY]: rt } }]
})
