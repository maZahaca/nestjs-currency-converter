# nestjs-currency-converter

## Overview
This is a simple multi-provider currency converter written in TypeScript with [NestJS](https://nestjs.com).

It uses [Github Actions](https://github.com/features/actions) to build a Docker image and push it into docker hub.

It can be deployed into AWS Cloud with [Terraform](https://www.terraform.io) from `./infra/terraform`.

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
