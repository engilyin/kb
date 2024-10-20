# Spring Data


## Logging

Here is test configuration for Spring Boot 3:

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
    driver-class-name: org.h2.Driver
    username: sa
    password:
  jpa:
    show-sql: true
    hibernate:
      ddl-auto: update
      format_sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.H2Dialect

logging:
  level:
    org.hibernate.orm.jdbc.bind: trace
```

Please note that to see the `sql` parameters you need to use `org.hibernate.orm.jdbc.bind: trace` for Spring Boot 3.
For earlier version it was `org.hibernate.type.descriptor.sql=trace`