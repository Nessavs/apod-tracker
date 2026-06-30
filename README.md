# APOD Tracker

[🇧🇷 Português](#português) | [🇺🇸 English](#english)

---

## English

Personal study project for learning TypeScript with a serverless AWS stack, consuming NASA's APOD (Astronomy Picture of the Day) API.


### Stack

- **Node.js 22** + **TypeScript** (strict mode)
- **Serverless Framework v3** + `serverless-esbuild`
- **AWS**: Lambda, API Gateway, EventBridge, SNS, SQS, S3 (future phases)
- **MongoDB Atlas** + Mongoose (phase 2)
- **Upstash Redis** (cache, phase 3)
- **Zod** (validation + inferred types)
- **Axios** + `axios-retry`
- **date-fns** + `date-fns-tz`
- **Pino** (structured logging)
- **Vitest** (testing)
- **ESLint** flat config + Husky + lint-staged
- **Docker Compose** (local Mongo + Redis)

### Roadmap

- [x] **Phase 1**: TS + Serverless + HTTP Lambda
- [ ] **Phase 2**: Zod validation + NASA API integration
- [ ] **Phase 3**: Mongoose + MongoDB + favorites CRUD
- [ ] **Phase 4**: Redis cache
- [ ] **Phase 5**: Scheduled Lambda (EventBridge cron)
- [ ] **Phase 6**: SNS + SQS messaging
- [ ] **Phase 7**: S3 + presigned URLs
- [ ] **Phase 8**: Vitest + coverage
- [ ] **Phase 9**: Step Functions
- [ ] **Phase 10**: Sentry + GitHub Actions
- [ ] **Phase 11**: Secrets Manager + OpenAPI docs

### Getting started

```bash
# install dependencies
npm install

# run locally
npx serverless offline
```

API available at `http://localhost:3000/dev/apod`.

### Project structure

```
src/
  handlers/      # Lambdas (entry points)
  services/      # Business logic / external calls
  schemas/       # Zod schemas and inferred types
  config/        # Validated env vars
  utils/         # Logger, helpers
```

### Why this project

This project simulates a real microservices serverless architecture, similar to production systems running on AWS. The goal is to practice TypeScript in a context that mirrors actual industry stacks.

---

## Português

Projeto pessoal de estudo para aprender TypeScript com stack serverless AWS, consumindo a API APOD (Astronomy Picture of the Day) da NASA.

### Stack

- **Node.js 22** + **TypeScript** (strict mode)
- **Serverless Framework v3** + `serverless-esbuild`
- **AWS**: Lambda, API Gateway, EventBridge, SNS, SQS, S3 (fases futuras)
- **MongoDB Atlas** + Mongoose (fase 2)
- **Upstash Redis** (cache, fase 3)
- **Zod** (validação + tipos inferidos)
- **Axios** + `axios-retry`
- **date-fns** + `date-fns-tz`
- **Pino** (logs estruturados)
- **Vitest** (testes)
- **ESLint** flat config + Husky + lint-staged
- **Docker Compose** (Mongo + Redis locais)

### Roadmap

- [x] **Fase 1**: TS + Serverless + Lambda HTTP
- [ ] **Fase 2**: Validação Zod + integração com NASA API
- [ ] **Fase 3**: Mongoose + MongoDB + CRUD de favoritas
- [ ] **Fase 4**: Cache com Redis
- [ ] **Fase 5**: Lambda agendada (EventBridge cron)
- [ ] **Fase 6**: Mensageria com SNS + SQS
- [ ] **Fase 7**: S3 + URLs pré-assinadas
- [ ] **Fase 8**: Vitest + cobertura
- [ ] **Fase 9**: Step Functions
- [ ] **Fase 10**: Sentry + GitHub Actions
- [ ] **Fase 11**: Secrets Manager + documentação OpenAPI

### Começando

```bash
# instala dependências
npm install

# roda localmente
npx serverless offline
```

API disponível em `http://localhost:3000/dev/apod`.

### Estrutura do projeto

```
src/
  handlers/      # Lambdas (entry points)
  services/      # Lógica de negócio / chamadas externas
  schemas/       # Schemas Zod e tipos inferidos
  config/        # Variáveis de ambiente