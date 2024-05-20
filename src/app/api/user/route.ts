import mysql from 'mysql2/promise'

export async function POST(request: Request) {
  const body = await request.json()
  const { name, avatar, username, password } = body

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  })

  try {
    const [result] = await connection.execute('INSERT INTO user (name, avatar, username, password) VALUES (?, ?, ?, ?)', [name, avatar, username, password])
    return Response.json({ result })
  } catch (e) {
    return Response.json({ success: false, result: null, message: null, code: 500 })
  };
}

export async function GET(request: Request) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  })

  try {
    const [rows] = await connection.query('SELECT * FROM user')
    return Response.json({ success: true, result: rows, message: null, code: null })
  } catch (e) {
    // res.status(500).json({ message: e.message })
  };
}
