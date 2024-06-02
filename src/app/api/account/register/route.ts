import { failure, success } from "@/apiHandlers/resultUtils"
import pool from "@/db"

export const POST = async (request: Request) => {
  const body = await request.json()
  const { username, password, name } = body

  const [result] = await pool.query(`SELECT * FROM user WHERE username = '${username}'`)

  if (!(result instanceof Array)) {
    return failure('数据错误')
  }

  // 已存在的用户名
  if (result.length) {
    return failure('账号已存在')
  }

  await pool.execute(`INSERT INTO user (username, password, name) VALUES ('${username}', '${password}', '${name}')`)

  return success(null)
}
