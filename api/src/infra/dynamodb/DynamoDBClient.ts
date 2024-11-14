import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb'

export const dynamoDBClient = new DynamoDBClient({} as DynamoDBClientConfig)
