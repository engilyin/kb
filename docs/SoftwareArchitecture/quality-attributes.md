---
id: quality-attributes
title: Quality Attributes
sidebar_label: Quality Attributes
description: Quality Attributes in Software Architecture
tags:
  - architecture
  - software
  - quality-attributes
---

# Quality Attributes

## Performance

### Performance tactics

- Control Resource Demand
  - Manage Samplig Rate
  - Limit Event Response
  - Prioritize Events
  - Reduce Overhead
  - Bound Execution Times
  - Increase Resource Efficiency
- Manage Resource
  - Increase Resources
  - Introduce Concurrency
  - Maintain Multiple Copies of Computation
  - Maintain Multiple Copies of Data
  - Bound Queue Sizes
  - Schedule Resources

### Types of performance testing

- `Load` -  to understand the behavior of the system under specific expected load. E.g. number of concurrent users during some period of time
- `Stress` - to understand the upper limits of the system
- `Soak (Endurance)` - to determine if the system can sustain the continuous expected load.
- `Spike` - suddenly change the generated load to determine wether the performance will suffer, the system will fail, or it will be able to handle dramatic changes in load.
- `Configuration`
- `Isolation`

## Scalability

- `Vertical` - scaling up
- `Hirizontal` - scaling out

### The scale cube
- X-axis: `horizontal duplication` **Scale by cloning** (stateless design, load balancing)
- Y-axis: `functional decomposition` **Scale by splitting different things** 
- Z-axis: `data partitioning` **Scale by splitting similar things** applied to data infrastructure

## Reliability (Fault-tolerance)

Measures:

- `Failure rate` the frequency with which the system is failing per unit of time
- `Mean Time to Failure` the average time from the start of operation until the time the failure first occurred 
- `Mean Time to Defect` the average time it takes to detect the problem
- `Mean Time to Resolve` the average time required to restore the failing component
- `Mean Time Between Failures` the average time between failures

### Principles

- `Understand Steady-State` know your system by monitoring, operational insights, understanding how failure looks like
- `Vary Real-World Events` analyze and prioritize real-world events by potential impact
- `Run Experiments in Prod`
- `Automate experiments` and run them continuously

## Availability  

`Service Level Agreement` SLA

### Availability tactics

- Defect Faults
  - Ping/Echo
  - Monitor
  - Heartbeat
  - Timestamp
  - Sanity Checking
  - Condition Monitoring
  - Voting
  - Exception Detection
  - Self-Test
- Recover from Faults
  - Preparation and Repair
  - Active Redundancy
  - Passive Redundancy
  - Spare
  - Exception Handling
  - Rollback
  - Software Upgrade
  - Retry
  - Ignore Fault Behavior
  - Reconfiguration
  - Reintroduction
  - Shadow
  - State Resynchronization
  - Escalating Restart
  - Non-Stop Forwarding
- Prevent Faults
  - Removal from Service
  - Transactions
  - Predictive Model
  - Exception Prevention
  - Increase Competence Set

## Security

Characteristics:
- `Integrity` the property ensuring that the data or services are not subject of unauthorized manipulation.
- `Confidentiality` the property ensuring that the data or services are protected from unauthorized access.
- `Availability` the property ensuring that the system will be available for legitimate use.

### Tactics

- Detect Attacks:
  - Detect Intrusion
  - Detect Service Denial
  - Verify Message Integrity
  - Detect Message Delay
- Resist Attacks:
  - Identify Actors
  - Authenticate Actors
  - Authorize Actors
  - Limit Access
  - Limit Exposure
  - Encrypt Data
  - Separate Entities
  - Change Default Settings
- React to Attacks
  - Reintroduction
  - Revoke Access
  - Lock Computer
  - Inform Actors
- Recover from Attacks
  - Maintain Audit Trail
  - Restore: See Availability
  
### STRIDE model

- `Spoofing identity` Illigaly accessing and then using another user's authentication information, such as username and password
- `Tampering with data` Malicious modification of data
- `Repudiation` A user performs an illegal operation in a system that lacks the ability to trace the prohibited operations.
- `Information disclosure` Exposure of information to individuals who are not supposed to have access to it.
- `Denial of service` DoS
- `Elevation of privilege` Unprivileged user gains privileged access and thereby has sufficient access to compromise or destroy the system.

### OWASP

Use `OWASP ZED Attack Proxy (ZAP)`

## Other QAs

- Conceptual Integrity
- Portability
- Durability
- Distributability
- Deployability
- Monitorability
- Safety
- Learnability
- Marketability
- Configurability
- Usability
