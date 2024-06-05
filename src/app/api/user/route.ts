import { success } from "@/apiHandlers/resultUtils"
import pool from "@/db"

export const GET = async () => {
  const [result] = await pool.query("SELECT * FROM user")
  return success(result)
}
