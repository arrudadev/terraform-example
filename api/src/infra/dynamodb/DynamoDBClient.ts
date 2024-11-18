import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb'

import { env } from '@/shared/env'

const config: DynamoDBClientConfig = {}

if (env.IS_OFFLINE) {
  config.endpoint = 'http://localhost:4566'
}

export const dynamoDBClient = new DynamoDBClient({} as DynamoDBClientConfig)
