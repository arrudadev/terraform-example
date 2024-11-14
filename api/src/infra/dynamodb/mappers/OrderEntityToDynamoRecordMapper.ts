import { Order } from '@/domain/orders/aggregates/Order'
import { marshall } from '@aws-sdk/util-dynamodb'
import { OrdersSchema } from '../schemas/OrdersSchema'

export class OrderEntityToDynamoRecordMapper {
  static map(order: Order) {
    return marshall(
      new OrdersSchema({
        PK: `ORDER#${order.id}`,
        SK: 'ORDER',
        GSI1PK: `CUSTOMER#${order.customer.id}`,
        GSI1SK: `CUSTOMER`,
        customer: {
          name: order.customer.name,
          email: order.customer.email,
        },
        items: order.items,
      }),
    )
  }
}
