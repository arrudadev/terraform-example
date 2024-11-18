import { CustomerProps } from '@/domain/orders/entities/Customer'
import { OrderItemProps } from '@/domain/orders/entities/OrderItem'
import { IOrderCreatedEvent } from '@/domain/orders/events/OrderCreatedEvent'
import { OrderFactory } from '@/domain/orders/factories/OrderFactory'
import { IOrderRepository } from '@/domain/orders/repositories/OrderRepository'

export type CreateOrderDTO = {
  customer: Omit<CustomerProps, 'id'>
  items: Array<Omit<OrderItemProps, 'id'>>
}

export class CreateOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private orderCreatedEvent: IOrderCreatedEvent,
  ) {}

  async execute(inputDTO: CreateOrderDTO) {
    const order = OrderFactory.create(inputDTO)
    await this.orderRepository.save(order)
    this.orderCreatedEvent.dispatch(order.id)
  }
}
