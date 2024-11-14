import { AttributeValue } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

import { OrderFactory } from '@/domain/orders/factories/OrderFactory'
import { Order } from '@/domain/orders/aggregates/Order'

import { OrdersSchema } from '../schemas/OrdersSchema'

export class DynamoRecordToOrderEntityMapper {
  static map(record: Record<string, AttributeValue>): Order {
    const order = unmarshall(record) as OrdersSchema

    return OrderFactory.create({
      id: order.PK.replace('ORDER#', ''),
      customer: {
        id: order.GSI1PK.replace('CUSTOMER#', ''),
        name: order.customer.name,
        email: order.customer.email,
      },
      items: order.items.map((item) => {
        return {
          id: item.id,
          quantity: item.quantity,
          productName: item.productName,
          productPrice: item.productPrice,
        }
      }),
    })
  }
}
