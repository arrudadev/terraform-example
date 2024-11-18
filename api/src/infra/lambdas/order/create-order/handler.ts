import { APIGatewayProxyEvent } from 'aws-lambda'

import { DynamoDBOrderRepository } from '@/infra/dynamodb/repositories/DynamoDBOrderRepository'
import { CreateOrderUseCase } from '@/use-cases/orders/create/CreateOrderUseCase'
import { OrderCreatedSNSPublisher } from '@/infra/sns/OrderCreatedSNSPublisher'
import { snsClient } from '@/infra/sns/SNSClient'

import { apiGatewayMiddleware } from '../../middlewares/apiGatewayMiddleware'
import { Body, bodySchema } from './event.schema'

const orderCreatedSNSPublisher = new OrderCreatedSNSPublisher(snsClient)
const orderRepository = new DynamoDBOrderRepository()
const createOrderUseCase = new CreateOrderUseCase(
  orderRepository,
  orderCreatedSNSPublisher,
)

const validations = {
  body: bodySchema,
}

const handler = async (event: APIGatewayProxyEvent) => {
  const { customer, items } = event.body as unknown as Body

  await createOrderUseCase.execute({ customer, items })

  return {
    statusCode: 201,
  }
}

export const main = apiGatewayMiddleware({
  handler,
  validations,
})
