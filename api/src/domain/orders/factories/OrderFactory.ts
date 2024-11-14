import { Order, OrderProps } from '../aggregates/Order'
import { Customer } from '../entities/Customer'
import { OrderItem } from '../entities/OrderItem'

export class OrderFactory {
  static create(order: OrderProps): Order {
    const customer = new Customer({
      id: order.customer.id,
      name: order.customer.name,
      email: order.customer.email,
    })

    const items = order.items.map((item) => {
      return new OrderItem({
        id: item.id,
        quantity: item.quantity,
        productName: item.productName,
        productPrice: item.productPrice,
      })
    })

    return new Order({
      id: order.id,
      customer,
      items,
    })
  }
}
