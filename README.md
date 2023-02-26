# nestjs-currency-converter

## Overview
This is a simple multi-provider currency converter written in NestJS.

It uses Github Actions to build a Docker image and push it into docker hub.

It can be deployed into AWS Cloud with Terraform from `./infra/terraform`.

## Development

```shell
npm run start:dev

curl -X GET "http://localhost:3000/convert?sellCurrency=GBP&buyCurrency=EUR&sellAmount=100"
```

## Deploy

```shell
cd ./infra/terraform/aws/lambda
terraform init
terraform apply -y
```
