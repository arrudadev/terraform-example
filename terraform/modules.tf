module "dynamodb" {
  source = "./modules/dynamodb"

  dynamodb_read_capacity = var.dynamodb_read_capacity
  dynamodb_write_capacity = var.dynamodb_write_capacity
}

module "sns" {
  source = "./modules/sns"
}

module "sqs" {
  source = "./modules/sqs"
}

module "policies" {
  source = "./modules/policies"

  order_created_queue_url = module.sqs.order_created_queue_id
  order_created_queue_arn = module.sqs.order_created_queue_arn
  order_created_topic_arn = module.sns.order_created_topic_arn_value
}

module "subscriptions" {
  source = "./modules/subscriptions"

  order_created_queue_arn = module.sqs.order_created_queue_arn
  order_created_topic_arn = module.sns.order_created_topic_arn_value
}
