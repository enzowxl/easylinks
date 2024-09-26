import { hash, compare } from 'bcryptjs'

const encryptPassword = async (password: string) => {
  return await hash(password, 6)
}

const verifyPassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword)
}

export { verifyPassword, encryptPassword }
