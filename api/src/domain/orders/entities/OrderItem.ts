import { z } from 'zod'

import { Entity } from '@/domain/core/entities/Entity'

export const orderItemSchema = z.object({
  id: z.string().uuid().optional(),
  productName: z.string(),
  productPrice: z.number(),
  quantity: z.number(),
})

export type OrderItemProps = z.infer<typeof orderItemSchema>

export class OrderItem extends Entity<OrderItemProps> {
  get productName() {
    return this.props.productName
  }

  get productPrice() {
    return this.props.productPrice
  }

  get quantity() {
    return this.props.quantity
  }

  protected validate() {
    orderItemSchema.parse(this.props)
  }
}
