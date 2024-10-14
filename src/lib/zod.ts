import { object, string } from 'zod'
import { formData } from 'zod-form-data'
import { createSlug } from '@/utils/slug'
import validateDomain from 'is-valid-domain'

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

const redirectSchema = formData({
  password: string({ message: 'Password is required' }).min(1, {
    message: 'Password is required',
  }),
})

const signUpSchema = formData({
  name: string({ message: 'Name is required' }).min(4, {
    message: 'Name must be more than 4 characters',
  }),
  email: string({ message: 'Email is required' })
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: string({ message: 'Password is required' }).min(8, {
    message: 'Password must be more than 8 characters',
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

const editDomainSchema = formData({
  newDomainName: string({ message: 'Domain is required' }).refine(
    (value) => validateDomain(value),
    {
      message: 'Invalid domain',
    },
  ),
})

const createLinkSchema = formData({
  destinationUrl: string({ message: 'Destination URL is required' }).url({
    message: 'Invalid destination URL',
  }),
  destinationSlug: string({ message: 'Destination slug is required' }).refine(
    (value) => createSlug(value),
  ),
  domainName: string({ message: 'Domain is required' })
    .refine((value) => validateDomain(value), {
      message: 'Invalid domain',
    })
    .optional(),
  destinationTitle: string({
    message: 'Invalid destination title',
  }).optional(),
  destinationDescription: string({
    message: 'Invalid destination description',
  }).optional(),
  utilsPassword: string({
    message: 'Invalid utils password',
  }).optional(),
})

const editLinkSchema = formData({
  destinationUrl: string({ message: 'Destination URL is required' })
    .url({
      message: 'Invalid destination URL',
    })
    .optional(),
  destinationSlug: string({ message: 'Destination slug is required' })
    .refine((value) => createSlug(value))
    .optional(),
  domainName: string({ message: 'Domain is required' })
    .refine((value) => validateDomain(value), {
      message: 'Invalid domain',
    })
    .optional(),
  destinationTitle: string({
    message: 'Invalid destination title',
  }).optional(),
  destinationDescription: string({
    message: 'Invalid destination description',
  }).optional(),
  utilsPassword: string({
    message: 'Invalid utils password',
  }).optional(),
})

export {
  signInSchema,
  redirectSchema,
  signUpSchema,
  createDomainSchema,
  editDomainSchema,
  createLinkSchema,
  editLinkSchema,
}
