import { handlerPath } from '../../utils/handlerPath'

export const CreateOrder = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'POST',
        path: '/orders',
        cors: true,
      },
    },
  ],
}
