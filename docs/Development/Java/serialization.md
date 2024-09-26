---
id: serialization
title: Serialization Libs
sidebar_label: Serialization
description: Serialization Libraries
tags:
  - serialization
  - java
  - libs
  - notes
---

# Serialization Libraries

## Castor

You need to use `Xcerces` lib explicitly and drop the `castor.properties` 
into your resources:

```
org.exolab.castor.xml.serializer.factory=org.exolab.castor.xml.XercesXMLSerializerFactory
#Default is org.exolab.castor.xml.XercesJDK5XMLSerializerFactory and it will not work with Java 9+
```


## JSON serialization

If you need serialize by fields and not by getters and setters:

```java showLineNumbers
@Slf4j
public class Json {

    private final ObjectMapper mapper;

    public Json() {
        this.mapper = Jackson2ObjectMapperBuilder.json()
                .serializationInclusion(JsonInclude.Include.NON_NULL)
                .visibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.NONE)
                .visibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY)
                .build();
    }

    public String toJson(Object object) {
        if(object != null) {

            try {
                return mapper.writeValueAsString(object);
            } catch (JsonProcessingException e) {
                log.error("Unable to serialize to json the object: {}", object, e);
                return "Unable to serialize to json the object: " + object;
            }
        }
        return "";
    }

    public <T> T fromJson(String src, Class<T> objectClass) {
        try {
            return mapper.readValue(src, objectClass);
        } catch (JsonProcessingException e) {
            return null;
        }
    }

```
