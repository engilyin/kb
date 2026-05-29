---
id: java-cli
title: Java Command Line Interface (CLI)
sidebar_label: Java CLI
description: The notes about running Java in Command Line
tags:
  - CLI
  - java
  - jdk
  - notes
---

# Java Command Line Interface (CLI)

## Running other Java

```shell
./gradlew clean build -Dorg.gradle.java.home=/Users/myuser/Library/Java/JavaVirtualMachines/corretto-1.8.0_312/Contents/Home
```


## Debugging Java

You can attach some remote debugger to the Java process by adding the following JVM options when starting your Java application:

```shell
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=*:5005 -jar your-app.jar
```