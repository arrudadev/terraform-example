import type { AWS } from '@serverless/typescript'

import * as functions from './src/infra/lambdas'

const config: AWS = {
  org: 'arrudadev',
  app: 'terraform-example',
  service: 'lambdas',
  frameworkVersion: '3.33.0',
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    stage: 'dev',
    region: 'us-east-1',
  },
  package: {
    individually: true,
    excludeDevDependencies: true,
  },
  functions,
  plugins: ['serverless-esbuild', 'serverless-offline'],
}

export = config
