import type { Handler } from 'aws-lambda'
import middy from '@middy/core'
import httpHeaderNormalizer from '@middy/http-header-normalizer'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import httpSecurityHeaders from '@middy/http-security-headers'
import httpErrorHandler from '@middy/http-error-handler'

import { requestValidation, RequestValidationProps } from './requestValidation'

export type ApiGatewayMiddlewareProps = {
  handler: Handler
  validations?: RequestValidationProps
}

export function apiGatewayMiddleware({
  handler,
  validations = {},
}: ApiGatewayMiddlewareProps) {
  return middy(handler)
    .use(httpHeaderNormalizer())
    .use(httpJsonBodyParser())
    .use(requestValidation(validations))
    .use(httpSecurityHeaders())
    .use(httpErrorHandler())
}
