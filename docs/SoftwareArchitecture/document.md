---
id: document
title: Architecture Documentation
sidebar_label: Documentation
description: Architecture Documentation
tags:
  - architecture
  - software
  - documentation
---

# Architecture Documentation

## Architectural Views

### View Types

- `Logical View` - functional components diagrams
- `Process View` - activity and sequence diagrams
- `Development View` - modules/packages diagrams
- `Physical View` - deployment diagrams
- `Scenarios` - Use Case diagrams

### 4+1 Document Structure

1. Scope
2. References
3. Architecture Representation
4. Architecture Goals & Constrains
5. Logical Architecture
6. Process Architecture
7. Development Architecture
8. Physical Architecture
9. Scenarios
10. Size and Performance
11. Quality

Appendices
- Acronyms and Abbreviations
- Definitions

:::warning
`4+1 Document Structure` is very old and out-dated
:::

### C4 Model

1. `System Context Diagram` - the starting point. Allows to look at the big picture. Your system as a box in the center, surrounded by its users and systems it interfaces with.
2. `Container Diagram` - the next step. A system high-level decomposition on **containers**. It could be web, mobile apps, file system etc
3. `Component diagram(s)` - zoom in and decompose each **container**
4. `Class Diagram(s)` - the last step. Drill down into the component's internals.

:::warning
`C4 Model` suitable for small and mid-size projects
:::

## SEI Views and Beyond

- `Module`
  - `Decomposition`
  - `Uses`
  - `Layered`
  - `Data Model`
- `Component and Connectors`
  - `Monolith`
  - `Service-Oriented`
  - `Event-Driven`
- `Allocation`
  - `Deployment`

## Architecture Design Flow

- Identify Stakeholders
- Identify Stakeholders' Concerns
- Design Candidate Architecture
- Identify Quality Properties
- Refine Candidate Architecture
- Create Architecture Design. Ensure Stakeholders' Concerns are met
- Refine Concerns, Candidate Architecture, Quality Attributes, Architecture Design

## Integration Document

1. Interface Identity
   - Approval
   - References
2. Contents
3. Overview
   - System context
   - Scope
   - Versioning
4. Requirements
   - Functional Requirements
   - Non-functional Requirements
   - Constraints
   - Use cases
5. Decisions
   - Assumptions
6. Usage Flows
7. Interface definition
   - Request (Examples/Data mapping)
   - Response (Examples/Data mapping)
   - Errors (Examples)
8. Quality attributes
   - Performance (Caching)
   - Reliability (Availability/Fault tolerance)
   - Security
9. Environments


## Review Documentation

Plan review of your documentation with appropriate stakeholders, define review criteria.

- Contains right information
- Resents information is a useful way
- Satisfies stakeholder needs


## Documentation Templates

### SAD,RUP

- Introduction
- Architecture representation
- Architectural goals and constraints
- Use case view
- Logical view
- Process view
- Development view
- Implementation view security
- Operations
- Data view
- Size and performance
- Quality

### SEI

- Documentation roadmap
- Architecture background
- Views:
  - *\<View Name\>* View
    - Primary representation
    - Elements catalog
    - Context diagram
    - Variability mechanism
    - Architecture background

### TOGAF

- Executive Summary
- Version history, content, purpose, scope
- Goals, objectives and constrains, architecture principles
- Baseline architecture(business, data, application, technology)
- Rationale and justification for architecture approach
- Mapping to architecture repository
- Target architecture (business, data, application, technology)
- Gap analysis
- Impact assessment
