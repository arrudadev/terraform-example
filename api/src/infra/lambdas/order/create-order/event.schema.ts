import { z } from 'zod'

import { customerSchema } from '@/domain/orders/entities/Customer'
import { orderItemSchema } from '@/domain/orders/entities/OrderItem'

export const bodySchema = z.object({
  customer: customerSchema,
  items: z.array(orderItemSchema).min(1),
})

export type Body = z.infer<typeof bodySchema>
