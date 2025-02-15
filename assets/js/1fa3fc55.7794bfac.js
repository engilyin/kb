"use strict";(self.webpackChunkalex_ilin_kb=self.webpackChunkalex_ilin_kb||[]).push([[7325],{293:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>t,metadata:()=>a,toc:()=>d});var o=r(4848),s=r(8453);const t={},i="Gradle",a={id:"Tools/gradle",title:"Gradle",description:"Windows support",source:"@site/docs/Tools/gradle.md",sourceDirName:"Tools",slug:"/Tools/gradle",permalink:"/kb/Tools/gradle",draft:!1,unlisted:!1,editUrl:"https://github.com/engilyin/kb/docs/Tools/gradle.md",tags:[],version:"current",lastUpdatedAt:1739639427e3,frontMatter:{},sidebar:"defaultSidebar",previous:{title:"GoDaddy",permalink:"/kb/Tools/godaddy"},next:{title:"JIRA",permalink:"/kb/Tools/jira"}},l={},d=[{value:"Windows support",id:"windows-support",level:2},{value:"Searching for some particular lib",id:"searching-for-some-particular-lib",level:2},{value:"How to resolve windows long path",id:"how-to-resolve-windows-long-path",level:2},{value:"Other JDK",id:"other-jdk",level:2},{value:"Useful plugins",id:"useful-plugins",level:2},{value:"Publishing the artifact",id:"publishing-the-artifact",level:2},{value:"Jacoco",id:"jacoco",level:2},{value:"Check spanpshots",id:"check-spanpshots",level:2},{value:"Running the build on Jenkins:",id:"running-the-build-on-jenkins",level:2},{value:"Typical multi module project",id:"typical-multi-module-project",level:2},{value:"Root gradle",id:"root-gradle",level:3},{value:"Lib module:",id:"lib-module",level:3},{value:"App module:",id:"app-module",level:3},{value:"Other",id:"other",level:3},{value:"Using legacy <code>junit</code> on modern systems",id:"using-legacy-junit-on-modern-systems",level:2},{value:"Asciidoctor",id:"asciidoctor",level:2},{value:"Custom plugins",id:"custom-plugins",level:2},{value:"Troubleshoot issues",id:"troubleshoot-issues",level:2},{value:"some plugin can&#39;t be started with <code>--no-daemon</code> mode",id:"some-plugin-cant-be-started-with---no-daemon-mode",level:3},{value:"Duplicated files in bootJar",id:"duplicated-files-in-bootjar",level:3},{value:"If your <code>jar</code> does not have a <code>pom</code> file on the maven repo",id:"if-your-jar-does-not-have-a-pom-file-on-the-maven-repo",level:3},{value:"Support <code>http</code> for maven repo",id:"support-http-for-maven-repo",level:3},{value:"Maven deps into gradle",id:"maven-deps-into-gradle",level:3},{value:"gradlew created on Windows",id:"gradlew-created-on-windows",level:3}];function c(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"gradle",children:"Gradle"})}),"\n",(0,o.jsx)(n.h2,{id:"windows-support",children:"Windows support"}),"\n",(0,o.jsxs)(n.p,{children:["In the MINGW64 shell set ",(0,o.jsx)(n.code,{children:"cygwin"})," terminal type. Just type in it manually in the setting and restart terminal"]}),"\n",(0,o.jsx)(n.h2,{id:"searching-for-some-particular-lib",children:"Searching for some particular lib"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:".\\gradlew app_name:dependencyInsight  --dependency spring-core\n"})}),"\n",(0,o.jsx)(n.h2,{id:"how-to-resolve-windows-long-path",children:"How to resolve windows long path"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-groovy",children:"\r\nif (OperatingSystem.current().isWindows()) {\r\n    task pathingJar(type: Jar) {\r\n        dependsOn configurations.runtimeClasspath\r\n        appendix = 'pathing'\r\n\r\n        doFirst {\r\n            manifest {\r\n                attributes 'Class-Path': configurations.runtimeClasspath.files.collect {\r\n                    it.toURL().toString().replaceFirst(/file:\\/+/, '/')\r\n                }.join(' ')\r\n            }\r\n        }\r\n    }\r\n\r\n    bootRun {\r\n        dependsOn pathingJar\r\n        doFirst {\r\n            classpath = files(\"$buildDir/classes/java/main\", \"$buildDir/resources/main\", pathingJar.archivePath)\r\n        }\r\n        dependsOn explodeWar\r\n        systemProperties = System.properties\r\n    }\r\n} else {\r\n    bootRun {\r\n        dependsOn explodeWar\r\n        systemProperties = System.properties\r\n    }\r\n}\r\n\n"})}),"\n",(0,o.jsx)(n.h2,{id:"other-jdk",children:"Other JDK"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:" ./gradlew clean build -Dorg.gradle.java.home=/Users/MyUserName/Library/Java/JavaVirtualMachines/corretto-1.8.0_312/Contents/Home\n"})}),"\n",(0,o.jsx)(n.h2,{id:"useful-plugins",children:"Useful plugins"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"apply plugin: 'java'\r\napply plugin: 'maven-publish'\r\napply plugin: 'project-report'\r\napply plugin: 'jacoco'\n"})}),"\n",(0,o.jsx)(n.h2,{id:"publishing-the-artifact",children:"Publishing the artifact"}),"\n",(0,o.jsx)(n.p,{children:"You need to use the new pligin:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"apply plugin: 'maven-publish'\n"})}),"\n",(0,o.jsx)(n.p,{children:"And you can define the publish task like that:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-groovy",children:'publishing {\r\n    publications {\r\n        if (project.tasks.findByName(\'bootJar\')) {\r\n            bootJava(MavenPublication) {\r\n                artifact bootJar\r\n            }\r\n        } else if (project.tasks.findByName(\'bootWar\')) {\r\n            bootWeb(MavenPublication) {\r\n                artifact bootWar\r\n            }\r\n        } else if (project.tasks.findByName(\'war\')) {\r\n            mavenWeb(MavenPublication) {\r\n                from components.web\r\n            }\r\n        } else {\r\n            mavenJava(MavenPublication) {\r\n                from components.java\r\n            }\r\n        }\r\n    }\r\n    repositories {\r\n        maven {\r\n            if ((project.name) != (project.libraryProject)) {\r\n                if (project.version.endsWith(\'-SNAPSHOT\')) {\r\n                    url = "https://somerepo.com/artifacts/my_ecosystem-maven-snapshot-libs-local"\r\n                } else {\r\n                    url = "https://somerepo.com/artifacts/my_ecosystem-maven-release-libs-local"\r\n                }\r\n            } else {\r\n                if (project.version.endsWith(\'-SNAPSHOT\')) {\r\n                    url = "https://somerepo.com/artifacts/my_ecosystem-maven-snapshot-virtual"\r\n                } else {\r\n                    url = "https://somerepo.com/artifacts/my_ecosystem-maven-release-virtual"\r\n                }\r\n            }\r\n            credentials {\r\n                username = "$artifactRepoUser"\r\n                password = "$artifactRepoPassword"\r\n            }\r\n        }\r\n    }\r\n}\n'})}),"\n",(0,o.jsx)(n.h2,{id:"jacoco",children:"Jacoco"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"jacocoTestReport {\r\n    reports {\r\n        xml.required = true\r\n        html.required = true\r\n    }\r\n}\r\n\r\ntest.finalizedBy jacocoTestReport\n"})}),"\n",(0,o.jsx)(n.h2,{id:"check-spanpshots",children:"Check spanpshots"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'ext.checkDependsOnSNAPSHOTInList = { items ->\r\n    def nonTransitiveConfig = items.copyRecursive()\r\n    nonTransitiveConfig.transitive = false\r\n\r\n    def hasError = false\r\n    nonTransitiveConfig.each {\r\n        if (it.toString().contains("SNAPSHOT")) {\r\n            hasError = true\r\n            println "ERROR: using snapshot: " + it\r\n        }\r\n    }\r\n    if (hasError) {\r\n        throw new Exception("Release build contains snapshot dependencies")\r\n\r\n    }\r\n}\r\ntask checkDependsOnSNAPSHOT {\r\n    doLast {\r\n        if (version.endsWith("SNAPSHOT"))\r\n            return;\r\n\r\n        checkDependsOnSNAPSHOTInList(project.configurations.compileClasspath)\r\n        checkDependsOnSNAPSHOTInList(project.configurations.runtimeClasspath)\r\n    }\r\n}\r\njar.dependsOn checkDependsOnSNAPSHOT\r\n\r\n\r\n// Ensure the preference of SNAPSHOT builds over any non-SNAPSHOT patch version (for the same major.minor module)\r\n//\r\n// This allows for the following case:\r\n//\r\n// If this project specifies "xyz-1.0.0-SNAPSHOT" but a dependency\'s dependent specifies "xyz-1.0.2"\r\n// the normal behavior would be to use "xyz-1.0.2".  This code locks in version "xyz-1.0.0-SNAPSHOT"\r\n// since we want SNAPSHOT versions to be consider newer then patch versions.\r\n//\r\nconfigurations.all {\r\n\r\n    def subprojectNames = []\r\n    if (project.parent != null) {\r\n        subprojectNames = project.parent.subprojects.collect { it.name }\r\n    }\r\n    def allSnapshotsList = [:]\r\n\r\n    resolutionStrategy {\r\n\r\n        // Build a list of all SNAPSHOT corelogic moudules\r\n        resolutionStrategy.eachDependency { DependencyResolveDetails details ->\r\n            if (details.requested.group != null && details.requested.group.startsWith(\'com.corelogic\')) {\r\n                if (details.requested.version.endsWith("SNAPSHOT")) {\r\n                    project.logger.debug("Found Snapshot: ${details.requested.group} name: ${details.requested.name} version: ${details.requested.version}")\r\n                    allSnapshotsList.put("${details.requested.group}:${details.requested.name}", "${details.requested.version}")\r\n                }\r\n            }\r\n        }\r\n\r\n        // Lock in the use of corelogic SNAPSHOT (if it matches MAJOR.MINOR version)\r\n        resolutionStrategy.eachDependency { DependencyResolveDetails details ->\r\n            if (!subprojectNames.contains(details.requested.name)) {\r\n                def snapshotVersion = allSnapshotsList.get("${details.requested.group}:${details.requested.name}")\r\n                if (snapshotVersion != null) {\r\n\r\n                    def lastIndexOfRequestedMajorMinor = details.requested.version.lastIndexOf(\'.\')\r\n                    def requestedMajorMinor = details.requested.version.substring(0, lastIndexOfRequestedMajorMinor)\r\n\r\n                    def lastIndexOfSnapshotMajorMinor = snapshotVersion.lastIndexOf(\'.\')\r\n                    def snapshotMajorMinor = snapshotVersion.substring(0, lastIndexOfSnapshotMajorMinor)\r\n\r\n                    if (requestedMajorMinor.equals(snapshotMajorMinor)) {\r\n                        project.logger.debug("Lock version from: ${details.requested.group} name: ${details.requested.name} version: ${details.requested.version} --\x3e ${snapshotVersion}")\r\n                        details.useVersion snapshotVersion\r\n                        details.because \'SNAPSHOTs are considered newer then any patch version\'\r\n                    } else {\r\n                        project.logger.debug("Do not lock SNAPSHOT of an older major.minor version: group: ${details.requested.group} name: ${details.requested.name} version: ${details.requested.version} --\x3e ${snapshotVersion}")\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\n\n'})}),"\n",(0,o.jsx)(n.h2,{id:"running-the-build-on-jenkins",children:"Running the build on Jenkins:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"./gradlew clean build -Pversion=1.2.3 --console=plain --no-daemon --stacktrace --rerun-tasks --refresh-dependencies\n"})}),"\n",(0,o.jsx)(n.h2,{id:"typical-multi-module-project",children:"Typical multi module project"}),"\n",(0,o.jsx)(n.h3,{id:"root-gradle",children:"Root gradle"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'plugins {\r\n    id \'org.springframework.boot\' version "${springBootVersion}" apply false\r\n    id \'io.spring.dependency-management\' version "${springDepManagmentVersion}"\r\n}\r\n\r\nrepositories {\r\n    mavenCentral()\r\n}\r\n\r\nallprojects {\r\n    group = \'com.mycompany\'\r\n    version = project.getProperty("version") == \'unspecified\' ? "${baseVersion}-SNAPSHOT" : project.getProperty("version")\r\n\r\n    repositories {\r\n        mavenLocal()\r\n\r\n        maven {\r\n            name = "release"\r\n            url "https://repo.mycompany.com/repo/project-maven-release-virtual"\r\n            credentials(PasswordCredentials) {\r\n                username "${artifactRepoUser}"\r\n                password "${artifactRepoPassword}"\r\n            }\r\n        }\r\n        maven {\r\n            name = "snapshot"\r\n            url "https://repo.mycompany.com/repo/project-maven-snapshot-virtual"\r\n            credentials(PasswordCredentials) {\r\n                username "${artifactRepoUser}"\r\n                password "${artifactRepoPassword}"\r\n            }\r\n        }\r\n\r\n        mavenCentral()\r\n        maven {\r\n            url "https://plugins.gradle.org/m2/"\r\n        }\r\n    }\r\n}\r\n\r\nsubprojects {\r\n    apply plugin: \'java\'\r\n    apply plugin: \'io.spring.dependency-management\'\r\n\r\n\tjava {\r\n\t\tsourceCompatibility = JavaVersion.VERSION_21\r\n\t\ttargetCompatibility = JavaVersion.VERSION_21\r\n\t}\r\n\r\n    tasks.withType(JavaCompile) {\r\n        options.encoding = \'UTF-8\'\r\n    }\r\n\r\n    dependencyManagement {\r\n        imports {\r\n            mavenBom org.springframework.boot.gradle.plugin.SpringBootPlugin.BOM_COORDINATES\r\n            mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"\r\n        }\r\n    }\r\n    \r\n    dependencies {\r\n        implementation group: \'commons-lang\', name: \'commons-lang\', version: \'2.6\'\r\n        compileOnly group: \'org.slf4j\', name: \'slf4j-api\'\r\n    }\r\n\r\n    configurations {\r\n        compileOnly {\r\n            extendsFrom annotationProcessor\r\n        }\r\n        compile {\r\n            all*.exclude group: "org.slf4j", module: "slf4j-simple"\r\n        }\r\n    }\r\n\r\n    task copyDependencies(type: Copy) {\r\n        from configurations.default\r\n        into \'dependencies\'\r\n    }\r\n\r\n    test {\r\n        useJUnitPlatform()\r\n    }\r\n}\r\n\n'})}),"\n",(0,o.jsx)(n.h3,{id:"lib-module",children:"Lib module:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"description = 'my lib'\r\n\r\napply from: '../../parent-common.gradle'\r\n\r\ndependencies {\r\n    implementation 'org.springframework:spring-web'\r\n    implementation group: 'commons-collections', name: 'commons-collections', version:'3.2'\r\n\r\n    testImplementation group: 'commons-httpclient', name: 'commons-httpclient', version:'3.1'\r\n}\n"})}),"\n",(0,o.jsx)(n.h3,{id:"app-module",children:"App module:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"plugins {\r\n    id \"com.gorylenko.gradle-git-properties\" version \"${gitPropertiesPluginVersion}\"\r\n}\r\n\r\n\r\ndescription = 'My Service'\r\n\r\napply plugin: 'org.springframework.boot'\r\n\r\napply from: '../../parent-common.gradle'\r\n\r\n\r\nconfigurations {\r\n    integrationTestImplementation {\r\n        extendsFrom testImplementation\r\n    }\r\n    all {\r\n        exclude group: 'findbugs', module: 'bcel'\r\n    }\r\n}\r\n\r\nsourceSets {\r\n    integrationTest {\r\n\r\n        compileClasspath += main.output + test.output\r\n        runtimeClasspath += main.output + test.output\r\n        java.srcDir file('src/integration-test/java')\r\n\r\n        resources.srcDir file('src/integration-test/resources')\r\n    }\r\n}\r\n\r\nidea {\r\n    module {\r\n        testSourceDirs += project.sourceSets.integrationTest.java.srcDirs\r\n        testSourceDirs += project.sourceSets.integrationTest.resources.srcDirs\r\n    }\r\n}\r\n\r\ndependencies {\r\n    implementation project(':my-lib')\r\n\r\n    implementation 'com.zaxxer:HikariCP'\r\n    implementation 'org.springframework.boot:spring-boot-starter-web'\r\n    implementation 'org.springframework.boot:spring-boot-starter-actuator'\r\n    implementation 'org.springframework.boot:spring-boot-starter-security'\r\n    implementation 'org.springframework.boot:spring-boot-starter-jdbc'\r\n\r\n    implementation 'com.oracle:ojdbc8:18.3.0.0.0'\r\n    implementation 'com.microsoft.sqlserver:sqljdbc4:4.2'\r\n\r\n    implementation group: 'ch.qos.logback', name: 'logback-core'\r\n    implementation group: 'ch.qos.logback', name: 'logback-classic'\r\n\r\n    //Dependencies from web module\r\n    //implementation group: 'xerces', name: 'xercesImpl'\r\n    implementation group: 'commons-collections', name: 'commons-collections', version: '3.2'\r\n    implementation group: 'commons-httpclient', name: 'commons-httpclient', version: '3.0'\r\n    implementation group: 'commons-codec', name: 'commons-codec', version: '1.3'\r\n    implementation group: 'org.springdoc', name: 'springdoc-openapi-ui', version: '1.5.10'\r\n\r\n    // Testing dependencies\r\n    testImplementation 'org.springframework.boot:spring-boot-starter-test'\r\n\r\n}\r\n\r\ntask integrationTest(type: Test) {\r\n    group = LifecycleBasePlugin.VERIFICATION_GROUP\r\n    description = 'Runs the integration tests.'\r\n\r\n    maxHeapSize = '1024m'\r\n\r\n    testClassesDirs = sourceSets.integrationTest.output.classesDirs\r\n    classpath = sourceSets.integrationTest.runtimeClasspath\r\n\r\n    outputs.upToDateWhen { false }\r\n}\r\n\n"})}),"\n",(0,o.jsx)(n.h3,{id:"other",children:"Other"}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.code,{children:"settings.properties"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"rootProject.name = 'my-cool-app'\r\ninclude ':my-lib'\r\ninclude ':app'\r\n\r\nproject(':my-lib').projectDir = \"$rootDir/modules/lib\" as File\r\nproject(':app').projectDir = \"$rootDir/modules/app\" as File\r\n\r\nproject(':app').name = \"my-cool-app\"\r\n\n"})}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.code,{children:"gardle.properties"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"libraryProject=my-cool-app\r\n\r\n# need for Jacoco\r\norg.gradle.jvmargs=--add-opens=java.prefs/java.util.prefs=ALL-UNNAMED\r\n\r\nbaseVersion=1.2.0\r\n\r\nspringBootVersion=2.6.7\r\nspringCloudVersion=2021.0.2\r\nspringDepManagmentVersion=1.0.11.RELEASE\r\n\r\n\r\ngitPropertiesPluginVersion=2.3.2\n"})}),"\n",(0,o.jsxs)(n.h2,{id:"using-legacy-junit-on-modern-systems",children:["Using legacy ",(0,o.jsx)(n.code,{children:"junit"})," on modern systems"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"\ttestImplementation 'junit:junit'\r\n\ttestImplementation 'org.junit.vintage:junit-vintage-engine'\n"})}),"\n",(0,o.jsx)(n.h2,{id:"asciidoctor",children:"Asciidoctor"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"    id 'org.asciidoctor.jvm.convert' version 3.3.2\r\n    \r\n    \r\n    asciidoctor {\r\n    sourceDir file('src/test/resources')\r\n    sources {\r\n        'index.adoc'\r\n    }\r\n    outputDir file('build/resources/main/static')\r\n}\r\n\r\n\n"})}),"\n",(0,o.jsx)(n.h2,{id:"custom-plugins",children:"Custom plugins"}),"\n",(0,o.jsxs)(n.p,{children:["add into ",(0,o.jsx)(n.code,{children:"settings.properties"})]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-groovy",children:"\r\npluginManagement {\r\n    repositories {\r\n        mavenLocal()\r\n        gradlePluginPortal()\r\n        maven {\r\n            url 'https://jaspersoft.jfrog.io/artifactory/third-party-ce-artifacts/'\r\n        }\r\n    }\r\n}\r\n\n"})}),"\n",(0,o.jsx)(n.h2,{id:"troubleshoot-issues",children:"Troubleshoot issues"}),"\n",(0,o.jsxs)(n.h3,{id:"some-plugin-cant-be-started-with---no-daemon-mode",children:["some plugin can't be started with ",(0,o.jsx)(n.code,{children:"--no-daemon"})," mode"]}),"\n",(0,o.jsxs)(n.p,{children:["If you experience the error like that for ",(0,o.jsx)(n.code,{children:"jacoco"}),", some static analizers etc plugins:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"Caused by: org.gradle.internal.service.ServiceCreationException: Could not create service of type IsolatedAntBuilder using BuildScopeServices.createIsolatedAntBuilder().\n"})}),"\n",(0,o.jsxs)(n.p,{children:["You need to add the line like that into your ",(0,o.jsx)(n.code,{children:"gradle.properties"}),":"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"org.gradle.jvmargs=--add-opens=java.prefs/java.util.prefs=ALL-UNNAMED\n"})}),"\n",(0,o.jsx)(n.h3,{id:"duplicated-files-in-bootjar",children:"Duplicated files in bootJar"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"bootJar {\r\n  duplicatesStrategy(DuplicatesStrategy.INCLUDE)\r\n}\n"})}),"\n",(0,o.jsx)(n.p,{children:"could be useful as well"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"configurations.all {\r\n    resolutionStrategy {\r\n        force 'xml-apis:xml-apis:2.0.2'\r\n    }\r\n}\n"})}),"\n",(0,o.jsxs)(n.h3,{id:"if-your-jar-does-not-have-a-pom-file-on-the-maven-repo",children:["If your ",(0,o.jsx)(n.code,{children:"jar"})," does not have a ",(0,o.jsx)(n.code,{children:"pom"})," file on the maven repo"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'    maven {\r\n        name = "releaseWithoutPom"\r\n        url "https://maven-repo/artifactory/maven-release-virtual"\r\n        credentials(PasswordCredentials) {\r\n            username "${artifactRepoUser}"\r\n            password "${artifactRepoPassword}"\r\n        }\r\n        metadataSources {\r\n            artifact()\r\n        }\r\n    }\n'})}),"\n",(0,o.jsxs)(n.h3,{id:"support-http-for-maven-repo",children:["Support ",(0,o.jsx)(n.code,{children:"http"})," for maven repo"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'repositories {\r\n    maven {\r\n        url "http://oss.sonatype.org/content/repositories/snapshots"\r\n        allowInsecureProtocol = true\r\n    }\r\n    // other repositories ...\r\n}\n'})}),"\n",(0,o.jsx)(n.h3,{id:"maven-deps-into-gradle",children:"Maven deps into gradle"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'<dependency>\\n\\s*<groupId>([a-z\\-\\d\\.]+)</groupId>\\n\\s*<artifactId>([a-z\\-\\d]+)</artifactId>\\n\\s*<version>([\\d|\\.|\\-]+)</version>\\n\\s*</dependency>\r\n\r\n\r\n<dependency>\\n\\s*<groupId>([a-z\\-\\d\\.]+)</groupId>\\n\\s*<artifactId>([a-z\\-\\d]+)</artifactId>\\n\\s*<version>([\\d|\\.|\\-]+)</version>\\n\\s*<scope>provided</scope>\\n\\s*</dependency>\r\n\r\nimplementation("$1:$2:$3")\r\n\n'})}),"\n",(0,o.jsx)(n.h3,{id:"gradlew-created-on-windows",children:"gradlew created on Windows"}),"\n",(0,o.jsx)(n.p,{children:"You need to set permissions to 777"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"git update-index --chmod=+x gradlew\n"})})]})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>i,x:()=>a});var o=r(6540);const s={},t=o.createContext(s);function i(e){const n=o.useContext(t);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),o.createElement(t.Provider,{value:n},e.children)}}}]);