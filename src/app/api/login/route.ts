import withErrorHandler from "@/apiHandlers/withErrorHandler";
import pool from "@/db";

export const POST = withErrorHandler(async (request) => {
  const body = await request.json();
  const { username, password } = body;

  const [result] = await pool.query(`SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`);

  if (result instanceof Array && result.length) {
    const user = result[0];
    return user;
  }
});
