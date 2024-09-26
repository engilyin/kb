---
id: java-migration
title: Java Migration Notes
sidebar_label: Migration
description: The notes how to migrate to the new Java JDK
tags:
  - migration
  - java
  - jdk
  - notes
  - howto
---

# Java Migration Notes

## Migration to Java 11 and 17



```java
tasks.withType(JavaExec) {
    jvmArgs += ['--add-opens', 'java.base/jdk.internal.loader=ALL-UNNAMED']
}


tasks.withType(JavaExec) {
    jvmArgs += ['--add-opens', 'java.base/java.util.concurrent=ALL-UNNAMED']
}
```

```shell
--add-opens java.base/java.util.concurrent=ALL-UNNAMED
```

## MacOS

```shell
/usr/libexec/java_home -V

sudo rm -rf /Users/<USER>/Library/Java/JavaVirtualMachines/openjdk-15.0.2/
```
