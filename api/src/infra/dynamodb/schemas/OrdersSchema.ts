import { CustomerProps } from '@/domain/orders/entities/Customer'
import { OrderItemProps } from '@/domain/orders/entities/OrderItem'

export type OrdersSchemaProps = {
  PK: string
  SK: string
  GSI1PK: string
  GSI1SK: string
  customer: Omit<CustomerProps, 'id'>
  items: Array<OrderItemProps>
}

export class OrdersSchema {
  private props!: OrdersSchemaProps

  constructor(props: OrdersSchemaProps) {
    Object.assign(this.props, props)
  }

  get PK() {
    return this.props.PK
  }

  get SK() {
    return this.props.SK
  }

  get GSI1PK() {
    return this.props.GSI1PK
  }

  get GSI1SK() {
    return this.props.GSI1SK
  }

  get customer() {
    return this.props.customer
  }

  get items() {
    return this.props.items
  }
}
