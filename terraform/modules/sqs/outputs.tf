output "order_created_queue_arn" {
  value = aws_sqs_queue.order_created_queue.arn
}

output "order_created_queue_id" {
  value = aws_sqs_queue.order_created_queue.id
}
