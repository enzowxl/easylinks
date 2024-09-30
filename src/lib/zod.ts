import { object, string } from 'zod'
import validateDomain from 'is-valid-domain'
import { formData } from 'zod-form-data'

const signInSchema = object({
  email: string({ message: 'Email is required' })
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: string({ message: 'Password is required' }).min(1, {
    message: 'Password is required',
  }),
  // .min(8, { message: 'Password must be more than 8 characters' })
  // .max(32, { message: 'Password must be less than 32 characters' }),
})

const signUpSchema = formData({
  name: string({ message: 'Name is required' }).min(4, {
    message: 'Name must be more than 4 characters',
  }),
  email: string({ message: 'Email is required' })
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: string({ message: 'Password is required' }).min(1, {
    message: 'Password is required',
  }),
})

const createDomainSchema = formData({
  domainName: string({ message: 'Domain is required' }).refine(
    (value) => validateDomain(value),
    {
      message: 'Invalid domain',
    },
  ),
})

export { signInSchema, signUpSchema, createDomainSchema }
