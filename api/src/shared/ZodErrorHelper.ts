import { ZodError } from 'zod'

export class ZodErrorHelper {
  static errorMessage(error: ZodError): string {
    console.log(error)
    return error.issues
      .map((issue) => {
        return `${issue.path.join('.')} ${issue.message}`
      })
      .join(', ')
  }
}
