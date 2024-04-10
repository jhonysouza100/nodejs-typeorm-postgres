import "dotenv/config"

const PORT = process.env.PORT || 3000
const JWT_SECRET = process.env.JWT_SECRET || 'secret.02'
const BCRYPT_SALT = process.env.BCRYPT_SALT || 8
const DB_URI = process.env.DB_URI || 'localhost'
const DB_PORT = process.env.DB_PORT || 5432
const DB_USER = process.env.DB_USER || 'admin'
const DB_PASS = process.env.DB_PASS || '123'

export default {
  jwtSecret: JWT_SECRET,
  bcryptSalt: BCRYPT_SALT,
  DB: {
    URI: DB_URI,
    PORT: DB_PORT,
    USER: DB_USER,
    PASS: DB_PASS
  },
  PORT: PORT
}