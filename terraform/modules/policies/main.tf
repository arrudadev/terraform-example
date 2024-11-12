resource "aws_sqs_queue_policy" "order_created_queue_policy" {
  queue_url = var.order_created_queue_url

  policy = jsonencode({
    Statement = [
      {
        Effect = "Allow"
        Principal = "*"
        Action = "sqs:SendMessage"
        Resource = var.order_created_queue_arn
        Condition = {
          ArnEquals = {
            "aws:SourceArn" = var.order_created_topic_arn
          }
        }
      }
    ]
  })
}
