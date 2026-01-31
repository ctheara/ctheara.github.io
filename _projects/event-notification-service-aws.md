---
layout: page
title: Event Notification Service - AWS
description: Serverless event-driven system on AWS
img: assets/img/projects/event-notification-cover.png
importance: 2
category: work
github: https://github.com/ctheara/event-notification-service-aws
---

A serverless event notification system built on AWS that enables publishers to submit events and subscribers to receive notifications through email or webhooks based on filtering preferences. Wanted to learn cloud architecture and serverless patterns.

**Key Features:**
- Event ingestion via `REST API` with API key authentication
- Multi-channel delivery (email via `SES`, webhooks via HTTP)
- Asynchronous processing with `SQS` buffering
- Dead-letter queue for failed messages
- `CloudWatch` monitoring and alerting

<br>

## Tech Stack

- **Cloud Platform:** `AWS`
- **Compute:** `Lambda` (3 serverless functions)
- **API:** `API Gateway` with API key auth
- **Messaging:** `SQS` (main queue + DLQ)
- **Database:** `DynamoDB` (Events, Subscriptions, Notifications)
- **Notifications:** `SES` (email), `SNS` (alerts)
- **Monitoring:** `CloudWatch` Logs & Alarms
- **Security:** `IAM` least-privilege policies

<br>

## Architecture

Event-driven serverless architecture with decoupled components:

```
Publisher
    │
    │ POST /events
    ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐
│ API Gateway │──> │   Lambda    │───>│        SQS          │
└─────────────┘    │  (Ingest)   │    │   (events-queue)    │
                   └─────────────┘    └──────────┬──────────┘
                                                 │
                                                 ▼
            ┌──────────────────┐       ┌─────────────────────┐
            │     DynamoDB     │<──────│      Lambda         │
            │    (Events &     │       │    (Processor)      │
            │  Notifications)  │       │                     │
            └──────────────────┘       └─────────┬───────────┘
                                                 │
                                          ┌──────┴──────┐
                                          ▼             ▼
                                      ┌───────┐    ┌─────────┐
                                      │  SES  │    │ Webhook │
                                      │(Email)│    │  (HTTP) │
                                      └───────┘    └─────────┘

        ┌────────────┐     ┌──────────────┐
        │    DLQ     │────>│  CloudWatch  │────> Alert Email
        │ (failures) │     │    Alarm     │
        └────────────┘     └──────────────┘
```

<br>

## Key Features & Implementation

1. **Event Ingestion** - REST API via `API Gateway` accepts events with type, severity, and metadata, triggering Lambda for validation and SQS submission.
2. **Subscription Management** - DynamoDB stores subscriber preferences with filters for event type and severity levels.
3. **Asynchronous Processing** - SQS buffers events for reliable async processing with Lambda polling for fault tolerance.
4. **Multi-Channel Delivery** - Event processor Lambda matches subscriptions and sends notifications via SES (email) or HTTP webhooks.
5. **Error Handling & Monitoring** - Dead-letter queue captures failed messages, CloudWatch alarms trigger SNS alerts for system health monitoring.

<br>


## API Endpoints

**POST /events** - Submit new event
```json
{
  "eventType": "deployment",
  "severity": "HIGH",
  "title": "API v2.1 deployed to production",
  "details": {
    "service": "user-api",
    "version": "2.1.0"
  }
}
```

**POST /subscriptions** - Create notification subscription
```json
{
  "eventType": "deployment",
  "severityFilter": "HIGH",
  "channel": "EMAIL",
  "target": "ops-team@company.com"
}
```

<br>

## Learnings

1. **New Technologies:** `AWS Lambda`, `API Gateway`, `SQS`, `DynamoDB`, `SES`
2. Use `CloudWatch` for observability, logging, and alarms; these are critical for debugging and monitoring serverless systems.

<br>

## Links

- **GitHub Repository:** [ctheara/event-notification-service-aws](https://github.com/ctheara/event-notification-service-aws)
- **AWS Setup Guide:** [docs/aws-setup.md](https://github.com/ctheara/event-notification-service-aws/blob/main/docs/aws-setup.md)

---

**Technologies:** `AWS` · `Lambda` · `API Gateway` · `SQS` · `DynamoDB` · `SES` · `CloudWatch` · `IAM` · `Serverless` · `Event-Driven Architecture`
