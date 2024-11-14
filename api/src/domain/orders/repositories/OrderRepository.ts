import { IRepository } from '@/domain/core/repositories/Repository'
import { Order } from '../aggregates/Order'

export interface IOrderRepository extends IRepository<Order> {
  findByCustomerId(customerId: string): Promise<Order[]>
}
