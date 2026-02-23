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


## OpenAPI-generated models: emit raw JSON for a String property (GeoJSON)

When an OpenAPI-generated model contains a `String` property that already holds
serialized JSON (for example `geometry` storing the result of `ST_AsGeoJSON`),
Jackson will by default emit it as a quoted, escaped string. To serialize the
content as raw JSON (no quotes / no escaping) use `@JsonRawValue` on the
generated property/getter.

Because generated models are overwritten on regeneration, prefer a generator-driven
solution: add a vendor extension to the OpenAPI YAML and instruct the generator
to print the annotation via a template override. If template changes are
inconvenient, a small post-generation patch task is an acceptable fallback.

Quick summary
- Add vendor extension to the OpenAPI schema property: `x-java-annotations`.
- Provide a `modelProperty.mustache` template override that prints the
  `vendorExtensions.x-java-annotations` entries before the field/getter.
- Configure `openApiGenerate.templateDir` to your `src/main/openapi-templates`.
- Regenerate: `gradlew openApiGenerate && gradlew build` and verify the
  generated model contains `@com.fasterxml.jackson.annotation.JsonRawValue` on
  the getter or field.

Why this is Jackson-3 friendly
- `@JsonRawValue` lives in `com.fasterxml.jackson.annotation` and is honored
  by Jackson 3 — no direct use of `ObjectMapper` or `com.fasterxml.jackson.databind`
  APIs required.

Minimal YAML snippet (add to your GeoJsonFeature.geometry property)

```yaml
geometry:
  type: string
  description: Geometry as a JSON string (serialized GeoJSON)
  x-java-annotations:
    - "@com.fasterxml.jackson.annotation.JsonRawValue"
```

Minimal `modelProperty.mustache` snippet (put in `src/main/openapi-templates`)

```mustache
{{! Emit per-property annotations provided via vendorExtensions.x-java-annotations }}
{{#vendorExtensions.x-java-annotations}}
{{#vendorExtensions.x-java-annotations}}
{{{.}}}
{{/vendorExtensions.x-java-annotations}}
{{/vendorExtensions.x-java-annotations}}

{{> _default_modelProperty }}
```

`build.gradle` (openApiGenerate) minimal addition

```groovy
openApiGenerate {
  // ...existing config...
  templateDir = "$projectDir/src/main/openapi-templates"
  configOptions = [
    jackson: "true",
    // ... other options ...
  ]
}
```

Fallback: post-generation patch task (Gradle)

If you can't or don't want to override templates, run a small Gradle task after
`openApiGenerate` that inserts the annotation into the generated file. Example
(abridged):

```groovy
task patchOpenApiModels {
  doLast {
    def f = file("$buildDir/generated/openapi/src/main/java/com/g2sentry/jurisdictionlookup/controllers/openapi/model/GeoJsonFeature.java")
    def txt = f.getText('UTF-8')
    txt = txt.replaceAll(/(?m)^\s*@JsonProperty\("geometry"\)\s*\n\s*public\s+@Nullable\s+String\s+getGeometry\(\)\s*\{/, "    @com.fasterxml.jackson.annotation.JsonRawValue\n@JsonProperty(\"geometry\")\npublic @Nullable String getGeometry() {")
    f.write(txt, 'UTF-8')
  }
}
```

Verification
- Run `gradlew openApiGenerate` then `gradlew build`.
- Inspect `build/generated/openapi/.../GeoJsonFeature.java` and verify the
  getter has `@com.fasterxml.jackson.annotation.JsonRawValue` above it.
- Start the app and call the endpoint that returns GeoJSON; `geometry` should
  be emitted as a JSON object (starts with `{`) not as an escaped string (starts
  with `"{\"`).

Notes
- Prefer the template override approach — it's declarative and survives
  regenerations without additional scripts.
- Keep the vendor-extension key consistent across your team (we used
  `x-java-annotations`).
- The `@JsonRawValue` annotation works with Jackson 3; this approach avoids
  direct ObjectMapper manipulation and keeps the code generation pipeline
  source-first.

