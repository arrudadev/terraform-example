import { SNSClient, SNSClientConfig } from '@aws-sdk/client-sns'
import { env } from '@/shared/env'

const config: SNSClientConfig = {}

if (env.IS_OFFLINE) {
  config.endpoint = 'http://localhost:4566'
}

export const snsClient = new SNSClient({} as SNSClientConfig)
