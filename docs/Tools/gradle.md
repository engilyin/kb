# Gradle

## Windows support

In the MINGW64 shell set `cygwin` terminal type. Just type in it manually in the setting and restart terminal

## Searching for some particular lib

```bash
.\gradlew app_name:dependencyInsight  --dependency spring-core
```

## How to resolve windows long path

```groovy

if (OperatingSystem.current().isWindows()) {
    task pathingJar(type: Jar) {
        dependsOn configurations.runtimeClasspath
        appendix = 'pathing'

        doFirst {
            manifest {
                attributes 'Class-Path': configurations.runtimeClasspath.files.collect {
                    it.toURL().toString().replaceFirst(/file:\/+/, '/')
                }.join(' ')
            }
        }
    }

    bootRun {
        dependsOn pathingJar
        doFirst {
            classpath = files("$buildDir/classes/java/main", "$buildDir/resources/main", pathingJar.archivePath)
        }
        dependsOn explodeWar
        systemProperties = System.properties
    }
} else {
    bootRun {
        dependsOn explodeWar
        systemProperties = System.properties
    }
}

```


## Other JDK

```
 ./gradlew clean build -Dorg.gradle.java.home=/Users/MyUserName/Library/Java/JavaVirtualMachines/corretto-1.8.0_312/Contents/Home
 ```

## Useful plugins

```
apply plugin: 'java'
apply plugin: 'maven-publish'
apply plugin: 'project-report'
apply plugin: 'jacoco'
```

## Publishing the artifact

You need to use the new pligin:

```
apply plugin: 'maven-publish'
```

And you can define the publish task like that:

```groovy
publishing {
    publications {
        if (project.tasks.findByName('bootJar')) {
            bootJava(MavenPublication) {
                artifact bootJar
            }
        } else if (project.tasks.findByName('bootWar')) {
            bootWeb(MavenPublication) {
                artifact bootWar
            }
        } else if (project.tasks.findByName('war')) {
            mavenWeb(MavenPublication) {
                from components.web
            }
        } else {
            mavenJava(MavenPublication) {
                from components.java
            }
        }
    }
    repositories {
        maven {
            if ((project.name) != (project.libraryProject)) {
                if (project.version.endsWith('-SNAPSHOT')) {
                    url = "https://somerepo.com/artifacts/my_ecosystem-maven-snapshot-libs-local"
                } else {
                    url = "https://somerepo.com/artifacts/my_ecosystem-maven-release-libs-local"
                }
            } else {
                if (project.version.endsWith('-SNAPSHOT')) {
                    url = "https://somerepo.com/artifacts/my_ecosystem-maven-snapshot-virtual"
                } else {
                    url = "https://somerepo.com/artifacts/my_ecosystem-maven-release-virtual"
                }
            }
            credentials {
                username = "$artifactRepoUser"
                password = "$artifactRepoPassword"
            }
        }
    }
}
```

## Jacoco

```
jacocoTestReport {
    reports {
        xml.required = true
        html.required = true
    }
}

test.finalizedBy jacocoTestReport
```


## Check spanpshots

```
ext.checkDependsOnSNAPSHOTInList = { items ->
    def nonTransitiveConfig = items.copyRecursive()
    nonTransitiveConfig.transitive = false

    def hasError = false
    nonTransitiveConfig.each {
        if (it.toString().contains("SNAPSHOT")) {
            hasError = true
            println "ERROR: using snapshot: " + it
        }
    }
    if (hasError) {
        throw new Exception("Release build contains snapshot dependencies")

    }
}
task checkDependsOnSNAPSHOT {
    doLast {
        if (version.endsWith("SNAPSHOT"))
            return;

        checkDependsOnSNAPSHOTInList(project.configurations.compileClasspath)
        checkDependsOnSNAPSHOTInList(project.configurations.runtimeClasspath)
    }
}
jar.dependsOn checkDependsOnSNAPSHOT


// Ensure the preference of SNAPSHOT builds over any non-SNAPSHOT patch version (for the same major.minor module)
//
// This allows for the following case:
//
// If this project specifies "xyz-1.0.0-SNAPSHOT" but a dependency's dependent specifies "xyz-1.0.2"
// the normal behavior would be to use "xyz-1.0.2".  This code locks in version "xyz-1.0.0-SNAPSHOT"
// since we want SNAPSHOT versions to be consider newer then patch versions.
//
configurations.all {

    def subprojectNames = []
    if (project.parent != null) {
        subprojectNames = project.parent.subprojects.collect { it.name }
    }
    def allSnapshotsList = [:]

    resolutionStrategy {

        // Build a list of all SNAPSHOT corelogic moudules
        resolutionStrategy.eachDependency { DependencyResolveDetails details ->
            if (details.requested.group != null && details.requested.group.startsWith('com.corelogic')) {
                if (details.requested.version.endsWith("SNAPSHOT")) {
                    project.logger.debug("Found Snapshot: ${details.requested.group} name: ${details.requested.name} version: ${details.requested.version}")
                    allSnapshotsList.put("${details.requested.group}:${details.requested.name}", "${details.requested.version}")
                }
            }
        }

        // Lock in the use of corelogic SNAPSHOT (if it matches MAJOR.MINOR version)
        resolutionStrategy.eachDependency { DependencyResolveDetails details ->
            if (!subprojectNames.contains(details.requested.name)) {
                def snapshotVersion = allSnapshotsList.get("${details.requested.group}:${details.requested.name}")
                if (snapshotVersion != null) {

                    def lastIndexOfRequestedMajorMinor = details.requested.version.lastIndexOf('.')
                    def requestedMajorMinor = details.requested.version.substring(0, lastIndexOfRequestedMajorMinor)

                    def lastIndexOfSnapshotMajorMinor = snapshotVersion.lastIndexOf('.')
                    def snapshotMajorMinor = snapshotVersion.substring(0, lastIndexOfSnapshotMajorMinor)

                    if (requestedMajorMinor.equals(snapshotMajorMinor)) {
                        project.logger.debug("Lock version from: ${details.requested.group} name: ${details.requested.name} version: ${details.requested.version} --> ${snapshotVersion}")
                        details.useVersion snapshotVersion
                        details.because 'SNAPSHOTs are considered newer then any patch version'
                    } else {
                        project.logger.debug("Do not lock SNAPSHOT of an older major.minor version: group: ${details.requested.group} name: ${details.requested.name} version: ${details.requested.version} --> ${snapshotVersion}")
                    }
                }
            }
        }
    }
}

```


## Running the build on Jenkins:

```
./gradlew clean build -Pversion=1.2.3 --console=plain --no-daemon --stacktrace --rerun-tasks --refresh-dependencies
```


## Typical multi module project


### Root gradle
```
plugins {
    id 'org.springframework.boot' version "${springBootVersion}" apply false
    id 'io.spring.dependency-management' version "${springDepManagmentVersion}"
}

repositories {
    mavenCentral()
}

allprojects {
    group = 'com.mycompany'
    version = project.getProperty("version") == 'unspecified' ? "${baseVersion}-SNAPSHOT" : project.getProperty("version")

    repositories {
        mavenLocal()

        maven {
            name = "release"
            url "https://repo.mycompany.com/repo/project-maven-release-virtual"
            credentials(PasswordCredentials) {
                username "${artifactRepoUser}"
                password "${artifactRepoPassword}"
            }
        }
        maven {
            name = "snapshot"
            url "https://repo.mycompany.com/repo/project-maven-snapshot-virtual"
            credentials(PasswordCredentials) {
                username "${artifactRepoUser}"
                password "${artifactRepoPassword}"
            }
        }

        mavenCentral()
        maven {
            url "https://plugins.gradle.org/m2/"
        }
    }
}

subprojects {
    apply plugin: 'java'
    apply plugin: 'io.spring.dependency-management'

	java {
		sourceCompatibility = JavaVersion.VERSION_21
		targetCompatibility = JavaVersion.VERSION_21
	}

    tasks.withType(JavaCompile) {
        options.encoding = 'UTF-8'
    }

    dependencyManagement {
        imports {
            mavenBom org.springframework.boot.gradle.plugin.SpringBootPlugin.BOM_COORDINATES
            mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
        }
    }
    
    dependencies {
        implementation group: 'commons-lang', name: 'commons-lang', version: '2.6'
        compileOnly group: 'org.slf4j', name: 'slf4j-api'
    }

    configurations {
        compileOnly {
            extendsFrom annotationProcessor
        }
        compile {
            all*.exclude group: "org.slf4j", module: "slf4j-simple"
        }
    }

    task copyDependencies(type: Copy) {
        from configurations.default
        into 'dependencies'
    }

    test {
        useJUnitPlatform()
    }
}

```


### Lib module:

```
description = 'my lib'

apply from: '../../parent-common.gradle'

dependencies {
    implementation 'org.springframework:spring-web'
    implementation group: 'commons-collections', name: 'commons-collections', version:'3.2'

    testImplementation group: 'commons-httpclient', name: 'commons-httpclient', version:'3.1'
}
```

### App module:

```
plugins {
    id "com.gorylenko.gradle-git-properties" version "${gitPropertiesPluginVersion}"
}


description = 'My Service'

apply plugin: 'org.springframework.boot'

apply from: '../../parent-common.gradle'


configurations {
    integrationTestImplementation {
        extendsFrom testImplementation
    }
    all {
        exclude group: 'findbugs', module: 'bcel'
    }
}

sourceSets {
    integrationTest {

        compileClasspath += main.output + test.output
        runtimeClasspath += main.output + test.output
        java.srcDir file('src/integration-test/java')

        resources.srcDir file('src/integration-test/resources')
    }
}

idea {
    module {
        testSourceDirs += project.sourceSets.integrationTest.java.srcDirs
        testSourceDirs += project.sourceSets.integrationTest.resources.srcDirs
    }
}

dependencies {
    implementation project(':my-lib')

    implementation 'com.zaxxer:HikariCP'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-actuator'
    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'org.springframework.boot:spring-boot-starter-jdbc'

    implementation 'com.oracle:ojdbc8:18.3.0.0.0'
    implementation 'com.microsoft.sqlserver:sqljdbc4:4.2'

    implementation group: 'ch.qos.logback', name: 'logback-core'
    implementation group: 'ch.qos.logback', name: 'logback-classic'

    //Dependencies from web module
    //implementation group: 'xerces', name: 'xercesImpl'
    implementation group: 'commons-collections', name: 'commons-collections', version: '3.2'
    implementation group: 'commons-httpclient', name: 'commons-httpclient', version: '3.0'
    implementation group: 'commons-codec', name: 'commons-codec', version: '1.3'
    implementation group: 'org.springdoc', name: 'springdoc-openapi-ui', version: '1.5.10'

    // Testing dependencies
    testImplementation 'org.springframework.boot:spring-boot-starter-test'

}

task integrationTest(type: Test) {
    group = LifecycleBasePlugin.VERIFICATION_GROUP
    description = 'Runs the integration tests.'

    maxHeapSize = '1024m'

    testClassesDirs = sourceSets.integrationTest.output.classesDirs
    classpath = sourceSets.integrationTest.runtimeClasspath

    outputs.upToDateWhen { false }
}

```

### Other
`settings.properties`
```
rootProject.name = 'my-cool-app'
include ':my-lib'
include ':app'

project(':my-lib').projectDir = "$rootDir/modules/lib" as File
project(':app').projectDir = "$rootDir/modules/app" as File

project(':app').name = "my-cool-app"

```

`gardle.properties`
```
libraryProject=my-cool-app

# need for Jacoco
org.gradle.jvmargs=--add-opens=java.prefs/java.util.prefs=ALL-UNNAMED

baseVersion=1.2.0

springBootVersion=2.6.7
springCloudVersion=2021.0.2
springDepManagmentVersion=1.0.11.RELEASE


gitPropertiesPluginVersion=2.3.2
```

## Using legacy `junit` on modern systems

```
	testImplementation 'junit:junit'
	testImplementation 'org.junit.vintage:junit-vintage-engine'
```

## Asciidoctor

```
    id 'org.asciidoctor.jvm.convert' version 3.3.2
    
    
    asciidoctor {
    sourceDir file('src/test/resources')
    sources {
        'index.adoc'
    }
    outputDir file('build/resources/main/static')
}


```


## Custom plugins

add into `settings.properties`

```groovy

pluginManagement {
    repositories {
        mavenLocal()
        gradlePluginPortal()
        maven {
            url 'https://jaspersoft.jfrog.io/artifactory/third-party-ce-artifacts/'
        }
    }
}

```

## Troubleshoot issues

### some plugin can't be started with `--no-daemon` mode

If you experience the error like that for `jacoco`, some static analizers etc plugins:

```
Caused by: org.gradle.internal.service.ServiceCreationException: Could not create service of type IsolatedAntBuilder using BuildScopeServices.createIsolatedAntBuilder().
```

You need to add the line like that into your `gradle.properties`:

```
org.gradle.jvmargs=--add-opens=java.prefs/java.util.prefs=ALL-UNNAMED
```

### Duplicated files in bootJar


```
bootJar {
  duplicatesStrategy(DuplicatesStrategy.INCLUDE)
}
```


could be useful as well

```
configurations.all {
    resolutionStrategy {
        force 'xml-apis:xml-apis:2.0.2'
    }
}
```


### If your `jar` does not have a `pom` file on the maven repo

```
    maven {
        name = "releaseWithoutPom"
        url "https://maven-repo/artifactory/maven-release-virtual"
        credentials(PasswordCredentials) {
            username "${artifactRepoUser}"
            password "${artifactRepoPassword}"
        }
        metadataSources {
            artifact()
        }
    }
```

### Support `http` for maven repo

```
repositories {
    maven {
        url "http://oss.sonatype.org/content/repositories/snapshots"
        allowInsecureProtocol = true
    }
    // other repositories ...
}
```

### Maven deps into gradle


```
<dependency>\n\s*<groupId>([a-z\-\d\.]+)</groupId>\n\s*<artifactId>([a-z\-\d]+)</artifactId>\n\s*<version>([\d|\.|\-]+)</version>\n\s*</dependency>


<dependency>\n\s*<groupId>([a-z\-\d\.]+)</groupId>\n\s*<artifactId>([a-z\-\d]+)</artifactId>\n\s*<version>([\d|\.|\-]+)</version>\n\s*<scope>provided</scope>\n\s*</dependency>

implementation("$1:$2:$3")

```

### gradlew created on Windows

You need to set permissions to 777

```
git update-index --chmod=+x gradlew
```

## Android

If you want gradle to install all required dependencies including SDK and Platform tools add this setting to 
gradle.properties:
```
android.builder.sdkDownload=true
```

also you need to set `ANDROID_HOME` and `ANDROID_SDK_ROOT`  env var and copy there `licenses/` folder with accepted licenses.
Also you need to install manually `cmdline-tools` putting its content under `$ANDROID_HOME/cmdline-tools/latest`

::warning:: on Windows you might need to reboot the computer to fully apply the env vars


Also it would be useful to have some place for gradle cache setting the `GRADLE_USER_HOME` env var