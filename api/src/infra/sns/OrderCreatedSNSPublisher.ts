import { PublishCommand, SNSClient } from '@aws-sdk/client-sns'

import { IOrderCreatedEvent } from '@/domain/orders/events/OrderCreatedEvent'
import { env } from '@/shared/env'

export class OrderCreatedSNSPublisher implements IOrderCreatedEvent {
  constructor(private snsClient: SNSClient) {}

  async dispatch(orderId: string): Promise<void> {
    const params = {
      Message: JSON.stringify({ orderId }),
      TopicArn: env.ORDER_CREATED_SNS_TOPIC_ARN,
    }

    await this.snsClient.send(new PublishCommand(params))
  }
}
