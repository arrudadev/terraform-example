import { z } from 'zod'

import { Entity } from '@/domain/core/entities/Entity'

export const customerSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string(),
})

export type CustomerProps = z.infer<typeof customerSchema>

export class Customer extends Entity<CustomerProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  protected validate() {
    customerSchema.parse(this.props)
  }
}
