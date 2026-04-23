import mysql from "mysql2/promise"

type DbEnv = {
  host?: string
  port?: number
  user?: string
  password?: string
  database?: string
  socketPath?: string
}

let pool: mysql.Pool | null = null

function readDbEnv(): DbEnv {
  const portRaw = process.env.CMS_DB_PORT
  const port = portRaw ? Number(portRaw) : undefined
  return {
    host: process.env.CMS_DB_HOST,
    port: Number.isFinite(port) ? port : undefined,
    user: process.env.CMS_DB_USER,
    password: process.env.CMS_DB_PASSWORD,
    database: process.env.CMS_DB_NAME,
    socketPath: process.env.CMS_DB_SOCKET,
  }
}

export function getDbPool(): mysql.Pool {
  if (pool) return pool

  const env = readDbEnv()
  if (!env.database) throw new Error("Missing CMS_DB_NAME in .env")
  if (!env.user) throw new Error("Missing CMS_DB_USER in .env")
  if (env.socketPath) {
    pool = mysql.createPool({
      socketPath: env.socketPath,
      user: env.user,
      password: env.password,
      database: env.database,
      connectionLimit: 10,
      namedPlaceholders: true,
    })
    return pool
  }

  if (!env.host) throw new Error("Missing CMS_DB_HOST in .env (or set CMS_DB_SOCKET instead)")
  pool = mysql.createPool({
    host: env.host,
    port: env.port || 3306,
    user: env.user,
    password: env.password,
    database: env.database,
    connectionLimit: 10,
    namedPlaceholders: true,
  })
  return pool
}

