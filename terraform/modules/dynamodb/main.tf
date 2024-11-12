resource "aws_dynamodb_table" "orders_table" {
  name = "Orders"
  billing_mode = "PROVISIONED"
  read_capacity = var.dynamodb_read_capacity
  write_capacity = var.dynamodb_write_capacity
  hash_key = "PK"
  range_key = "SK"

  attribute {
    name = "PK"
    type = "S"
  }

  attribute {
    name = "SK"
    type = "S"
  }

  attribute {
    name = "GSI1PK"
    type = "S"
  }

  attribute {
    name = "GSI1SK"
    type = "S"
  }

  ttl {
    attribute_name = "TimeToExist"
    enabled        = true
  }

  global_secondary_index {
    name = "GSI1"
    hash_key = "GSI1PK"
    range_key = "GSI1SK"
    projection_type = "ALL"
    read_capacity = var.dynamodb_read_capacity
    write_capacity = var.dynamodb_write_capacity
  }
}
