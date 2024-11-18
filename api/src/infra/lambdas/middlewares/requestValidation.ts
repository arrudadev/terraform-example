import { ZodAny, ZodArray, ZodNullable, ZodObject } from 'zod'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import middy from '@middy/core'
import HttpError from 'http-errors'

import { ZodErrorHelper } from '@/shared/ZodErrorHelper'

export type RequestValidationProps = {
  body?: ZodObject<any> | ZodAny | ZodArray<any>
  queryParams?: ZodObject<any> | ZodAny | ZodNullable<any>
  pathParams?: ZodObject<any> | ZodAny
}

export function requestValidation(validations: RequestValidationProps) {
  const before: middy.MiddlewareFn<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
  > = (request) => {
    if (validations.body) {
      const { error } = validations.body.safeParse(request.event.body)

      if (error) {
        throw new HttpError.BadRequest(
          `Request body is invalid: ${ZodErrorHelper.errorMessage(error)}`,
        )
      }
    }

    if (validations.queryParams) {
      const { error } = validations.queryParams.safeParse(
        request.event.queryStringParameters,
      )

      if (error) {
        throw new HttpError.BadRequest(
          `Query params are invalid: ${ZodErrorHelper.errorMessage(error)}`,
        )
      }
    }

    if (validations.pathParams) {
      const { error } = validations.pathParams.safeParse(
        request.event.pathParameters,
      )

      if (error) {
        throw new HttpError.BadRequest(
          `Path params are invalid: ${ZodErrorHelper.errorMessage(error)}`,
        )
      }
    }
  }

  return { before }
}
