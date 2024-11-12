#!/bin/bash

BUCKET_NAME="terraform-state-bucket"
LOCALSTACK_ENDPOINT="http://localhost:4566"

aws --endpoint-url=$LOCALSTACK_ENDPOINT s3 mb s3://$BUCKET_NAME

echo "Bucket '$BUCKET_NAME' created successfully."