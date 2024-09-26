---
id: soap
title: Java SOAP Services
sidebar_label: SOAP
description: The notes about Java SOAP Services
tags:
  - SOAP
  - WebServices
  - java
  - notes
---

# Java SOAP Web Services

## Migrating SOAP

### Spring Services

Consider the usage of latest libs. Check `jakarta` analogs.


#### Client:

```groovy showLineNumbers


configurations {
    jaxb
}

jar {
    from sourceSets.main.output.files
    println "${buildDir}/classes/jaxb"
    from "${buildDir}/classes/jaxb"
}



task genJaxb {
    ext.sourcesDir = "${buildDir}/generated-sources/jaxb"
    ext.classesDir = "${buildDir}/classes/jaxb"
//    ext.schema = "http://localhost:8080/my-service/wsdl/myservice.wsdl"
    ext.schema = "src/main/resources/myservice.wsdl"
    outputs.dir classesDir

    doLast() {
        project.ant {
            taskdef name: "xjc", classname: "com.sun.tools.xjc.XJCTask",
                    classpath: configurations.jaxb.asPath
            mkdir(dir: sourcesDir)
            mkdir(dir: classesDir)

            xjc(destdir: sourcesDir, schema: schema,
                    package: "com.my.service.wsdl") {
                arg(value: "-wsdl")
                produces(dir: sourcesDir, includes: "**/*.java")
            }

            javac(destdir: classesDir, source: 1.8, target: 1.8, debug: true,
                    debugLevel: "lines,vars,source",
                    classpath: configurations.jaxb.asPath) {
                src(path: sourcesDir)
                include(name: "**/*.java")
                include(name: "*.java")
            }

            copy(todir: classesDir) {
                fileset(dir: sourcesDir, erroronmissingdir: false) {
                    exclude(name: "**/*.java")
                }
            }
        }
    }
}


dependency {

    implementation (group: 'org.springframework.boot', name: 'spring-boot-starter-web-services'){
        exclude group: 'org.hibernate.validator'
    }
    
    implementation 'javax.xml.bind:jaxb-api:2.2.11'
    implementation 'javax.activation:activation:1.2'
    implementation 'org.glassfish.jaxb:jaxb-runtime:2.2.11'

    implementation("wsdl4j:wsdl4j:1.6.1")
    jaxb("org.glassfish.jaxb:jaxb-xjc:2.2.11")
    implementation(files(genJaxb.classesDir).builtBy(genJaxb))
    
}


Client class:

```java
@Configuration
public class ClientConfig {


    @Value("${service.url}")
    private String host;

    private String rootPath = "/v1/my-service";

    private String jaxbGeneratedPackage = "com.my.service.wsdl";

    @Bean
    public Jaxb2Marshaller marshaller() {
        Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
        // this package must match the package in the <generatePackage> specified
        // in gradle genJaxb
        marshaller.setContextPath(jaxbGeneratedPackage);
        return marshaller;
    }

    @Bean
    public MyClient myClient(Jaxb2Marshaller marshaller) {
        MyClient client = new MyClient();
        client.setDefaultUri(host  + rootPath);
        client.setMarshaller(marshaller);
        client.setUnmarshaller(marshaller);
        return client;
    }
}




@Service //not sure that is needed
public class MyClient extends WebServiceGatewaySupport {

    public static final String NAMESPACE_URI = "http://ws.my.company.com";

    public String getHello(String name) {

        LOG.info("Requesting for getHello operation. ");
        operationName = "/getHello";

        GetHelloRequest request = new GetHelloRequest();
        request.setPersonName(name);

        GetHelloResponse response = (GetHelloResponse) getWebServiceTemplate()
                .marshalSendAndReceive(host + rootPath + operationName, request,
                        new SoapActionCallback(
                                NAMESPACE_URI));

        return response.getHelloEcho();
    }
}

```

#### Server

```groovy
configurations {
    jaxb
}

task genJaxb {
    ext.sourcesDir = "${buildDir}/generated-sources/jaxb"
    ext.classesDir = "${buildDir}/classes/jaxb"
    ext.schema = "src/main/resources/MyServiceEndpointService_schema1.xsd"

    outputs.dir classesDir

    doLast() {
        project.ant {
            taskdef name: "xjc", classname: "com.sun.tools.xjc.XJCTask",
                    classpath: configurations.jaxb.asPath
            mkdir(dir: sourcesDir)
            mkdir(dir: classesDir)

            xjc(destdir: sourcesDir, schema: schema) {
                arg(value: "-wsdl")
                produces(dir: sourcesDir, includes: "**/*.java")
            }

            javac(destdir: classesDir, source: 1.8, target: 1.8, debug: true,
                    debugLevel: "lines,vars,source",
                    classpath: configurations.jaxb.asPath) {
                src(path: sourcesDir)
                include(name: "**/*.java")
                include(name: "*.java")
            }

            copy(todir: classesDir) {
                fileset(dir: sourcesDir, erroronmissingdir: false) {
                    exclude(name: "**/*.java")
                }
            }
        }
    }
}


dependencies {

    implementation group: 'org.springframework.boot', name: 'spring-boot-starter-web-services'

    implementation 'javax.xml.bind:jaxb-api:2.2.11'
    implementation 'javax.activation:activation:1.2'
    implementation 'org.glassfish.jaxb:jaxb-runtime:2.2.11'

    implementation("wsdl4j:wsdl4j:1.6.1")
    jaxb("org.glassfish.jaxb:jaxb-xjc:2.2.11")
    implementation(files(genJaxb.classesDir).builtBy(genJaxb))
}


```

```yaml
my:
  shared:
    wsdllocation: /v1/my-service
    basePath: /v1/my-service/*
    portname: MyServiceEndpoint
    xsdresource: MyServiceEndpointService_schema1.xsd

```

Java code:
```java

@EnableWs
@Configuration
public class MyServiceConfig extends WsConfigurerAdapter {
    
    @Value("${my.shared.wsdllocation}")
    private String wsdllocationUrl;

    @Value("${my.shared.basePath}")
    private String basePath;

    @Value("${my.shared.portname}")
    private String portName;

    @Value("${my.shared.xsdresource}")
    private String xsdresource;
    
    @Bean
    public ServletRegistrationBean messageDispatcherServlet(ApplicationContext applicationContext) {
        MessageDispatcherServlet servlet = new MessageDispatcherServlet();
        servlet.setApplicationContext(applicationContext);
        servlet.setTransformWsdlLocations(true);
//        return new ServletRegistrationBean(servlet, "/ws/*");
        return new ServletRegistrationBean(servlet, basePath);
    }
    
    @Bean
    public CustomLoggerImpl getCustomLogger() {
        setSystemProperty();
        CustomLoggerImpl customLogger = new CustomLoggerImpl();
        Security.addProvider(new IngrianProvider(customLogger));
        return customLogger;
    }
    
    @Bean(name = "myservice")
    public DefaultWsdl11Definition defaultWsdl11Definition(XsdSchema cryptoServiceSchema) {
        DefaultWsdl11Definition wsdl11Definition = new DefaultWsdl11Definition();
        wsdl11Definition.setPortTypeName(portName);
        wsdl11Definition.setLocationUri(wsdllocationUrl);
        wsdl11Definition.setTargetNamespace(MyServiceEndpoint.NAMESPACE_URI);
        wsdl11Definition.setSchema(myServiceSchema);
        return wsdl11Definition;
    }
    
        @Bean
    public XsdSchema myServiceSchema() {
        return new SimpleXsdSchema(new ClassPathResource(xsdresource));
    }


}


@Endpoint
@Slf4j
public class MyServiceEndpoint {
    public static final String NAMESPACE_URI = "http://ws.my.company.com";

    private ObjectFactory factory = new ObjectFactory();

    @Autowired
    private MyService myService;

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getHelloRequest")
    @ResponsePayload
    public GetHelloResponse sayHello(@RequestPayload GetHelloRequest request) {
        GetHelloResponse response = new GetHelloResponse();
        response.setHelloEcho("Hello " + request.getPersonName());
        return response;
    }
}

```
