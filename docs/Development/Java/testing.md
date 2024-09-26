---
id: testing
title: Testing
sidebar_label: Testing
description: Testing on Java
tags:
  - test
  - java
  - notes
---

# Testing


Use this annotation to initialize Mocks instead of `initMocks` call:

```java showLineNumbers
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)


        Mockito.verify(valOps, Mockito.times(1)).set(getKey(ID), getData(), TTL, TimeUnit.SECONDS);

        assertEquals(0L, count);

        assertFalse(object.isPresent());
        assertTrue(object.isPresent());
        assertNotNull(sp);



```

to keep all `when` at `setUp` method use notation to turn off strict unnecessary stubbing exceptions:

```java
        lenient().when(redisTemplate.opsForValue()).thenReturn(valOps);
```
