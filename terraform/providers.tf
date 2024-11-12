provider "aws" {
  # Localstack setup
  access_key  = "test"
  secret_key  = "test"
  region      = "us-east-1"

  s3_use_path_style           = true
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    dynamodb = "http://localhost:4566"
    sns      = "http://localhost:4566"
    sqs      = "http://localhost:4566"
    s3       = "http://localhost:4566"
  }
}