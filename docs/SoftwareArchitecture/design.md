---
id: design
title: Architectural Styles and Patterns
sidebar_label: Design
description: Architectural Styles and Patterns
tags:
  - architecture
  - software
  - design
  - patterns
  - style
---

# Architectural Styles and Patterns

## Architecture Design Principles

- `Single Responsibility Principle` states that every object should have a single responsibility, and that all its services should be narrowly aligned with that responsibility. It can be implemented by:
  - `Separation of Concern` is the process of breaking a computer program into distinct features that overlap in functionality as little as possible. A concern (feature, behavior) is any piece of interest or focus i a program. 
  - `Bounded Context` is a central pattern in Domain-Driven Design. It is the focus od DDD's strategic design section which is all about dealing with large models and teams. DDD deals with large models by dividing them into different bounded contexts abd being expicit about their interrelationships.

  A `Context Map` is the global view of the application as a whole. Each BC fits within the context map to show how they should communicate amongst each other and how data should be shared.
- `Principle of Least Knowledge` states that any component or object should not have knowledge about the internal details of other components. This approach avoids interdependencies and helps maintainability.
- `Coupling` is a measure of how strongly dependent one software unit on other software unit.
- `Cohesion` refers to the degree to which the elements inside a module belong together.
- `Stateful vs Stateless` is about building stateful or stateless services, where a state is a condition or quality of an entity at an instant in time.

## Styles

- `Monolith`
- `Layered`
- `Microservices`
- `Event-Driven`
  - `Mediator` to orchestrate 
  - `Broker`
- `Actor-Based`
- `REST` Representational State Transfer

## Patterns

### Performance and Scalability

- `CQRS`
- `Event Sourcing`
- `Sharding`
  - `Lookup Strategy`
  - `Range Strategy`
  - `Hash Strategy`

### Integration

- Messaging Patterns
  - Message
  - Command Message
  - Document Message
  - Event Message
  - Request-Reply
  - Return Address
  - Correlation Identifier
  - Message Sequence
  - Message Expiration
  - Format Indicator
- Message Routing
  - Pipes-and-Filters
  - Message Router
  - Content-Based Router
  - Message Filter
  - Dynamic Router
  - Recipient List
  - Splitter
  - Aggregator
  - Resequencer
  - Composed Message Processor
  - Scatter Gather
  - Routing Slip
  - Process Manager
  - Message Broker
- Message Transformation
  - Message Translator
  - Envelop Wrapper
  - Content Enricher
  - Content Filter
  - Claim Check
  - Normalizer
- Message Endpoints
  - Message Endpoint
  - Messaging Gateway
  - Message Mapper
  - Transactional Client
  - Polling Consumer
  - Event-driven Consumer
  - Competing Consumers
  - Message Dispatcher
  - Selective Consumer
  - Durable Subscriber
  - Idempotent Receiver
  - Service Activator
- Message Channels
  - Message Channel
  - Point-to-Point Channel
  - Publish-Subscriber Channel
  - Datatype Channel
  - Invalid Message Channel
  - Dead Letter Channel
  - Guaranteed Delivery
  - Channel Adapter
  - Message Bridge
  - Message Bus
- System Management
  - Control Bus
  - Detour
  - Wire Tap
  - Message History
  - Message Store
  - Smart Proxy
  - Test Message
  - Channel Purger

#### Messaging Patterns

- `File Transfer`
- `Shared Database`
- `Remote Procedure Invocation`
- `Messaging`

### Fault tolerance patterns

- `Redundancy` can be:
  - spatial (Active-Active, Active-Passive[hot,warm or cold], N+1)
  - temporal
  - informal
- `Votung`
  - `Majority vote` uneven node number
  - `Generalized median voting` select median removing extremes
  - `Formalized plurality voting` divide into partitions, choose randome from the largest partition
- `Heartbeat`
- `Leaky Bucket Counter` how a bucket with a leak will overflow if either the average rate at which water is poured in exceeds the rate at which the bucket leaks or if more water than the capacity of the bucket is poured in all at once, and how the water leaks from the bucket at an (almost) constant rate.
- `Isolation`. Protect app from cascading failures
- `Circuit Breaker`

### Security patterns

- `Federated Identity` separate user auth from the app and delegate to trusted identity provider
- `Gatekeeper`
- `Valet Key`

### Release patterns

- `Blue/Green Deployment`
- `Canary Releasing`