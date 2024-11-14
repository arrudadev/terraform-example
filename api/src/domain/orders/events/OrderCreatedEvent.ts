export interface OrderCreatedEvent {
  dispatch(orderId: string): void
}
