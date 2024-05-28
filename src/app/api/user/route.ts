import withErrorHandler from "@/apiHandlers/withErrorHandler"
import pool from "@/db"

export const POST = withErrorHandler(async (request) => {
  const body = await request.json()
  const { name, avatar, username, password } = body

  await pool.execute(
    `INSERT INTO user (name, avatar, username, password) VALUES ('${name}', '${avatar}', '${username}', '${password}')`,
  )

  return [true]
})

export const GET = withErrorHandler(async () => {
  const [result] = await pool.query("SELECT * FROM user")
  return [result]
})
