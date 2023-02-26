provider "aws" {
  region     = var.aws_region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

locals {
  app_name = "currency-converter"
  namespace = "nestjs-test"
}
