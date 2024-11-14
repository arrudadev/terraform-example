import { z } from 'zod'

import { Entity } from '@/domain/core/entities/Entity'

import { OrderItem, orderItemSchema } from '../entities/OrderItem'
import { Customer, customerSchema } from '../entities/Customer'

export const orderSchema = z.object({
  id: z.string().uuid().optional(),
  customer: customerSchema,
  items: z.array(orderItemSchema),
})

export type OrderProps = z.infer<typeof orderSchema>

type OrderEntityProps = Omit<z.infer<typeof orderSchema>, 'items'> & {
  items: OrderItem[]
  customer: Customer
}

export class Order extends Entity<OrderEntityProps> {
  get customer() {
    return this.props.customer
  }

  get items() {
    return this.props.items
  }

  protected validate() {
    orderSchema.parse(this.props)
  }

  getTotalPrice() {
    return this.props.items.reduce(
      (acc, item) => acc + item.productPrice * item.quantity,
      0,
    )
  }
}
