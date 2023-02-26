#data "archive_file" "dist" {
#  type     = "zip"
#  excludes = [
#    "${path.module}/../../../infra",
#    "${path.module}/../../../test",
#    "${path.module}/../../../src",
#  ]
#
#  source_dir  = "${path.module}/../../../"
#  output_path = "${path.module}/../../../lambda-build.zip"
#
#  depends_on = [null_resource.build]
#}
#
#resource "null_resource" "build" {
#  triggers = {
#    updated_at = timestamp()
#  }
#
#  provisioner "local-exec" {
#    command = <<EOF
#    npm install
#    npm run build
#    npm install --omit=dev --ignore-scripts
#    EOF
#
#    working_dir = "${path.module}/../../../"
#  }
#}

resource "aws_lambda_function" "lambda" {
  function_name = local.app_name

  image_uri        = "mazahaca/nestjs-currency-converter:a9a0c5b"
#  image_config {
#    command = [
#      "lambda.handler"
#    ]
#  }
  role             = aws_iam_role.lambda_role.arn
  handler          = "dist/lambda.handler"
#  s3_bucket        = aws_s3_bucket.lambda_bucket.id
#  s3_key           = aws_s3_object.lambda_bucket_object.key
#  source_code_hash = data.archive_file.dist.output_base64sha256


  runtime = "nodejs18.x"
  timeout = "30"

  environment {
    variables = {
      "PORT" = "80"
    }
  }
}

resource "aws_lambda_permission" "lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "apigateway.amazonaws.com"

  # The "/*/*" portion grants access from any method on any resource
  # within the API Gateway REST API.
  source_arn = "${aws_api_gateway_rest_api.api_gateway_rest_api.execution_arn}/*/*"
}
