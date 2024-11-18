export interface IOrderCreatedEvent {
  dispatch(orderId: string): void
}
