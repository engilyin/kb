---
id: dependencies
title: Java Dependencies
sidebar_label: Dependencies
description: The notes about dependencies
tags:
  - dependencies
  - java
  - jdk
  - notes
---

# Useful Dependencies

```groovy showLineNumbers
plugins {
    id 'org.springframework.boot' version "${springBootVersion}" apply false
    id 'io.spring.dependency-management' version "${springDepManagmentVersion}"
}

    apply plugin: 'io.spring.dependency-management'


    dependencyManagement {
        imports {
            mavenBom org.springframework.boot.gradle.plugin.SpringBootPlugin.BOM_COORDINATES
            mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
        }
    }

    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
    
    testCompileOnly("org.projectlombok:lombok")
    testAnnotationProcessor("org.projectlombok:lombok")
    
    implementation 'javax.activation:javax.activation-api:1.2.0'
    implementation 'com.sun.activation:javax.activation:1.2.0'
    implementation 'xml-apis:xml-apis::2.0.2'   //1.4.01'
    
    implementation group: 'javax.annotation', name: 'javax.annotation-api'
    implementation group: 'jakarta.validation', name: 'jakarta.validation-api'

    
    implementation group: 'commons-httpclient', name: 'commons-httpclient', version: '3.1'
    implementation group: 'commons-logging', name: 'commons-logging', version: '1.2'
    implementation group: 'commons-lang', name: 'commons-lang', version: '2.6'
    implementation 'org.apache.commons:commons-lang3:3.12.0'
    implementation group: 'commons-collections', name: 'commons-collections', version: '3.2.2'
    implementation group: 'commons-io', name: 'commons-io', version: '2.11.0'
    implementation group: 'commons-discovery', name: 'commons-discovery', version: '0.4'  (0.5 is voulnarable) 
    implementation group: 'commons-beanutils', name: 'commons-beanutils', version: '1.9.4'
    implementation group: 'org.apache.commons', name: 'commons-pool2', version: '2.11.1'
    implementation group: 'commons-fileupload', name: 'commons-fileupload', version: '1.4'

    implementation group: 'jdom', name: 'jdom', version: '1.1.1'
    
    implementation group: 'com.google.code.gson', name: 'gson', version: '2.9.0'
    
    implementation group: 'org.slf4j', name: 'jcl-over-slf4j', version: "${slf4jVersion}"
    implementation group: 'org.slf4j', name: 'log4j-over-slf4j', version: "${slf4jVersion}"
    implementation group: 'org.slf4j', name: 'log4j-over-slf4j', version: "${slf4jVersion}"
    
    implementation "ch.qos.logback:logback-classic:${logbackVersion}"
    implementation "ch.qos.logback:logback-core:${logbackVersion}"

        
        
    compileOnly group: 'com.fasterxml.jackson.core', name: 'jackson-databind'
    compileOnly group: 'com.fasterxml.jackson.core', name: 'jackson-annotations'
    compileOnly group: 'com.fasterxml.jackson.core', name: 'jackson-core'
    
    implementation 'jakarta.persistence:jakarta.persistence-api'
    implementation group: 'jakarta.transaction', name: 'jakarta.transaction-api'
    implementation 'org.hibernate:hibernate-core'

    implementation 'javassist:javassist:3.12.1.GA'
    implementation 'org.owasp.encoder:encoder:1.2.3'
    implementation 'org.owasp.esapi:esapi:2.4.0.0'

	testImplementation 'junit:junit'
	testImplementation 'org.junit.vintage:junit-vintage-engine'
	

    implementation("org.glassfish.metro:webservices-rt:2.4.4")
    implementation("org.glassfish.metro:webservices-api:2.4.4")
```
