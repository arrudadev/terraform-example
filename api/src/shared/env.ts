import { z } from 'zod'

const envSchema = z.object({
  IS_OFFLINE: z.string().optional(),
  ORDER_CREATED_SNS_TOPIC_ARN: z.string().optional(),
})

export const env = envSchema.parse(process.env)
