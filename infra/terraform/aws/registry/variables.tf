variable "aws_region" {
  type = string
  default = "eu-west-2"
}

variable "aws_access_key" {
  type = string
  default = ""
}

variable "aws_secret_key" {
  type = string
  default = ""
}

variable "stage" {
  type = string
  default = "staging"
}
