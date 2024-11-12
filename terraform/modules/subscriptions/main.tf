resource "aws_sns_topic_subscription" "order_created_subscription" {
  topic_arn = var.order_created_topic_arn
  protocol = "sqs"
  endpoint = var.order_created_queue_arn
}
