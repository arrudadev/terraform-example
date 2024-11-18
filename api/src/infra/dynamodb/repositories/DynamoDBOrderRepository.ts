import { marshall } from '@aws-sdk/util-dynamodb'
import {
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
} from '@aws-sdk/client-dynamodb'

import { Order } from '@/domain/orders/aggregates/Order'
import { IOrderRepository } from '@/domain/orders/repositories/OrderRepository'

import { dynamoDBClient } from '../DynamoDBClient'
import { OrderEntityToDynamoRecordMapper } from '../mappers/OrderEntityToDynamoRecordMapper'
import { DynamoRecordToOrderEntityMapper } from '../mappers/DynamoRecordToOrderEntityMapper'

export class DynamoDBOrderRepository implements IOrderRepository {
  async save(order: Order): Promise<void> {
    const command = new PutItemCommand({
      TableName: 'Orders',
      Item: OrderEntityToDynamoRecordMapper.map(order),
    })

    await dynamoDBClient.send(command)
  }

  async findByCustomerId(id: string): Promise<Order[]> {
    const command = new QueryCommand({
      TableName: 'Orders',
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1PK = :GSI1PK',
      ExpressionAttributeValues: marshall({
        ':GSI1PK': `CUSTOMER#${id}`,
      }),
    })

    const output = await dynamoDBClient.send(command)

    return (output.Items || []).map((item) =>
      DynamoRecordToOrderEntityMapper.map(item),
    )
  }

  async findById(id: string): Promise<Order | null> {
    const command = new GetItemCommand({
      TableName: 'Orders',
      Key: marshall({
        PK: `ORDER#${id}`,
        SK: 'ORDER',
      }),
    })

    const output = await dynamoDBClient.send(command)

    return output.Item ? DynamoRecordToOrderEntityMapper.map(output.Item) : null
  }
}
