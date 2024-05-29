import { success } from "@/apiHandlers/resultUtils"
import pool from "@/db"

export const POST = async (request: Request) => {
  const body = await request.json()
  const { name, avatar, username, password } = body

  await pool.execute(
    `INSERT INTO user (name, avatar, username, password) VALUES ('${name}', '${avatar}', '${username}', '${password}')`,
  )

  return success(true)
}

export const GET = async () => {
  const [result] = await pool.query("SELECT * FROM user")
  return success(result)
}
