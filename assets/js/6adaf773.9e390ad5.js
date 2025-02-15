"use strict";(self.webpackChunkalex_ilin_kb=self.webpackChunkalex_ilin_kb||[]).push([[8938],{4834:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>o,contentTitle:()=>i,default:()=>p,frontMatter:()=>t,metadata:()=>l,toc:()=>c});var a=n(4848),s=n(8453);const t={id:"soap",title:"Java SOAP Services",sidebar_label:"SOAP",description:"The notes about Java SOAP Services",tags:["SOAP","WebServices","java","notes"]},i="Java SOAP Web Services",l={id:"Development/Java/services/soap",title:"Java SOAP Services",description:"The notes about Java SOAP Services",source:"@site/docs/Development/Java/services/soap.md",sourceDirName:"Development/Java/services",slug:"/Development/Java/services/soap",permalink:"/kb/Development/Java/services/soap",draft:!1,unlisted:!1,editUrl:"https://github.com/engilyin/kb/docs/Development/Java/services/soap.md",tags:[{inline:!0,label:"SOAP",permalink:"/kb/tags/soap"},{inline:!0,label:"WebServices",permalink:"/kb/tags/web-services"},{inline:!0,label:"java",permalink:"/kb/tags/java"},{inline:!0,label:"notes",permalink:"/kb/tags/notes"}],version:"current",lastUpdatedAt:1727331161e3,frontMatter:{id:"soap",title:"Java SOAP Services",sidebar_label:"SOAP",description:"The notes about Java SOAP Services",tags:["SOAP","WebServices","java","notes"]},sidebar:"defaultSidebar",previous:{title:"Serialization",permalink:"/kb/Development/Java/serialization"},next:{title:"Testing",permalink:"/kb/Development/Java/testing"}},o={},c=[{value:"Migrating SOAP",id:"migrating-soap",level:2},{value:"Spring Services",id:"spring-services",level:3},{value:"Client:",id:"client",level:4},{value:"Server",id:"server",level:4}];function d(e){const r={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r.header,{children:(0,a.jsx)(r.h1,{id:"java-soap-web-services",children:"Java SOAP Web Services"})}),"\n",(0,a.jsx)(r.h2,{id:"migrating-soap",children:"Migrating SOAP"}),"\n",(0,a.jsx)(r.h3,{id:"spring-services",children:"Spring Services"}),"\n",(0,a.jsxs)(r.p,{children:["Consider the usage of latest libs. Check ",(0,a.jsx)(r.code,{children:"jakarta"})," analogs."]}),"\n",(0,a.jsx)(r.h4,{id:"client",children:"Client:"}),"\n",(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-groovy",metastring:"showLineNumbers",children:'\r\n\r\nconfigurations {\r\n    jaxb\r\n}\r\n\r\njar {\r\n    from sourceSets.main.output.files\r\n    println "${buildDir}/classes/jaxb"\r\n    from "${buildDir}/classes/jaxb"\r\n}\r\n\r\n\r\n\r\ntask genJaxb {\r\n    ext.sourcesDir = "${buildDir}/generated-sources/jaxb"\r\n    ext.classesDir = "${buildDir}/classes/jaxb"\r\n//    ext.schema = "http://localhost:8080/my-service/wsdl/myservice.wsdl"\r\n    ext.schema = "src/main/resources/myservice.wsdl"\r\n    outputs.dir classesDir\r\n\r\n    doLast() {\r\n        project.ant {\r\n            taskdef name: "xjc", classname: "com.sun.tools.xjc.XJCTask",\r\n                    classpath: configurations.jaxb.asPath\r\n            mkdir(dir: sourcesDir)\r\n            mkdir(dir: classesDir)\r\n\r\n            xjc(destdir: sourcesDir, schema: schema,\r\n                    package: "com.my.service.wsdl") {\r\n                arg(value: "-wsdl")\r\n                produces(dir: sourcesDir, includes: "**/*.java")\r\n            }\r\n\r\n            javac(destdir: classesDir, source: 1.8, target: 1.8, debug: true,\r\n                    debugLevel: "lines,vars,source",\r\n                    classpath: configurations.jaxb.asPath) {\r\n                src(path: sourcesDir)\r\n                include(name: "**/*.java")\r\n                include(name: "*.java")\r\n            }\r\n\r\n            copy(todir: classesDir) {\r\n                fileset(dir: sourcesDir, erroronmissingdir: false) {\r\n                    exclude(name: "**/*.java")\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n\r\ndependency {\r\n\r\n    implementation (group: \'org.springframework.boot\', name: \'spring-boot-starter-web-services\'){\r\n        exclude group: \'org.hibernate.validator\'\r\n    }\r\n    \r\n    implementation \'javax.xml.bind:jaxb-api:2.2.11\'\r\n    implementation \'javax.activation:activation:1.2\'\r\n    implementation \'org.glassfish.jaxb:jaxb-runtime:2.2.11\'\r\n\r\n    implementation("wsdl4j:wsdl4j:1.6.1")\r\n    jaxb("org.glassfish.jaxb:jaxb-xjc:2.2.11")\r\n    implementation(files(genJaxb.classesDir).builtBy(genJaxb))\r\n    \r\n}\r\n\r\n\r\nClient class:\r\n\r\n```java\r\n@Configuration\r\npublic class ClientConfig {\r\n\r\n\r\n    @Value("${service.url}")\r\n    private String host;\r\n\r\n    private String rootPath = "/v1/my-service";\r\n\r\n    private String jaxbGeneratedPackage = "com.my.service.wsdl";\r\n\r\n    @Bean\r\n    public Jaxb2Marshaller marshaller() {\r\n        Jaxb2Marshaller marshaller = new Jaxb2Marshaller();\r\n        // this package must match the package in the <generatePackage> specified\r\n        // in gradle genJaxb\r\n        marshaller.setContextPath(jaxbGeneratedPackage);\r\n        return marshaller;\r\n    }\r\n\r\n    @Bean\r\n    public MyClient myClient(Jaxb2Marshaller marshaller) {\r\n        MyClient client = new MyClient();\r\n        client.setDefaultUri(host  + rootPath);\r\n        client.setMarshaller(marshaller);\r\n        client.setUnmarshaller(marshaller);\r\n        return client;\r\n    }\r\n}\r\n\r\n\r\n\r\n\r\n@Service //not sure that is needed\r\npublic class MyClient extends WebServiceGatewaySupport {\r\n\r\n    public static final String NAMESPACE_URI = "http://ws.my.company.com";\r\n\r\n    public String getHello(String name) {\r\n\r\n        LOG.info("Requesting for getHello operation. ");\r\n        operationName = "/getHello";\r\n\r\n        GetHelloRequest request = new GetHelloRequest();\r\n        request.setPersonName(name);\r\n\r\n        GetHelloResponse response = (GetHelloResponse) getWebServiceTemplate()\r\n                .marshalSendAndReceive(host + rootPath + operationName, request,\r\n                        new SoapActionCallback(\r\n                                NAMESPACE_URI));\r\n\r\n        return response.getHelloEcho();\r\n    }\r\n}\r\n\n'})}),"\n",(0,a.jsx)(r.h4,{id:"server",children:"Server"}),"\n",(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-groovy",children:'configurations {\r\n    jaxb\r\n}\r\n\r\ntask genJaxb {\r\n    ext.sourcesDir = "${buildDir}/generated-sources/jaxb"\r\n    ext.classesDir = "${buildDir}/classes/jaxb"\r\n    ext.schema = "src/main/resources/MyServiceEndpointService_schema1.xsd"\r\n\r\n    outputs.dir classesDir\r\n\r\n    doLast() {\r\n        project.ant {\r\n            taskdef name: "xjc", classname: "com.sun.tools.xjc.XJCTask",\r\n                    classpath: configurations.jaxb.asPath\r\n            mkdir(dir: sourcesDir)\r\n            mkdir(dir: classesDir)\r\n\r\n            xjc(destdir: sourcesDir, schema: schema) {\r\n                arg(value: "-wsdl")\r\n                produces(dir: sourcesDir, includes: "**/*.java")\r\n            }\r\n\r\n            javac(destdir: classesDir, source: 1.8, target: 1.8, debug: true,\r\n                    debugLevel: "lines,vars,source",\r\n                    classpath: configurations.jaxb.asPath) {\r\n                src(path: sourcesDir)\r\n                include(name: "**/*.java")\r\n                include(name: "*.java")\r\n            }\r\n\r\n            copy(todir: classesDir) {\r\n                fileset(dir: sourcesDir, erroronmissingdir: false) {\r\n                    exclude(name: "**/*.java")\r\n                }\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n\r\ndependencies {\r\n\r\n    implementation group: \'org.springframework.boot\', name: \'spring-boot-starter-web-services\'\r\n\r\n    implementation \'javax.xml.bind:jaxb-api:2.2.11\'\r\n    implementation \'javax.activation:activation:1.2\'\r\n    implementation \'org.glassfish.jaxb:jaxb-runtime:2.2.11\'\r\n\r\n    implementation("wsdl4j:wsdl4j:1.6.1")\r\n    jaxb("org.glassfish.jaxb:jaxb-xjc:2.2.11")\r\n    implementation(files(genJaxb.classesDir).builtBy(genJaxb))\r\n}\r\n\r\n\n'})}),"\n",(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-yaml",children:"my:\r\n  shared:\r\n    wsdllocation: /v1/my-service\r\n    basePath: /v1/my-service/*\r\n    portname: MyServiceEndpoint\r\n    xsdresource: MyServiceEndpointService_schema1.xsd\r\n\n"})}),"\n",(0,a.jsx)(r.p,{children:"Java code:"}),"\n",(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-java",children:'\r\n@EnableWs\r\n@Configuration\r\npublic class MyServiceConfig extends WsConfigurerAdapter {\r\n    \r\n    @Value("${my.shared.wsdllocation}")\r\n    private String wsdllocationUrl;\r\n\r\n    @Value("${my.shared.basePath}")\r\n    private String basePath;\r\n\r\n    @Value("${my.shared.portname}")\r\n    private String portName;\r\n\r\n    @Value("${my.shared.xsdresource}")\r\n    private String xsdresource;\r\n    \r\n    @Bean\r\n    public ServletRegistrationBean messageDispatcherServlet(ApplicationContext applicationContext) {\r\n        MessageDispatcherServlet servlet = new MessageDispatcherServlet();\r\n        servlet.setApplicationContext(applicationContext);\r\n        servlet.setTransformWsdlLocations(true);\r\n//        return new ServletRegistrationBean(servlet, "/ws/*");\r\n        return new ServletRegistrationBean(servlet, basePath);\r\n    }\r\n    \r\n    @Bean\r\n    public CustomLoggerImpl getCustomLogger() {\r\n        setSystemProperty();\r\n        CustomLoggerImpl customLogger = new CustomLoggerImpl();\r\n        Security.addProvider(new IngrianProvider(customLogger));\r\n        return customLogger;\r\n    }\r\n    \r\n    @Bean(name = "myservice")\r\n    public DefaultWsdl11Definition defaultWsdl11Definition(XsdSchema cryptoServiceSchema) {\r\n        DefaultWsdl11Definition wsdl11Definition = new DefaultWsdl11Definition();\r\n        wsdl11Definition.setPortTypeName(portName);\r\n        wsdl11Definition.setLocationUri(wsdllocationUrl);\r\n        wsdl11Definition.setTargetNamespace(MyServiceEndpoint.NAMESPACE_URI);\r\n        wsdl11Definition.setSchema(myServiceSchema);\r\n        return wsdl11Definition;\r\n    }\r\n    \r\n        @Bean\r\n    public XsdSchema myServiceSchema() {\r\n        return new SimpleXsdSchema(new ClassPathResource(xsdresource));\r\n    }\r\n\r\n\r\n}\r\n\r\n\r\n@Endpoint\r\n@Slf4j\r\npublic class MyServiceEndpoint {\r\n    public static final String NAMESPACE_URI = "http://ws.my.company.com";\r\n\r\n    private ObjectFactory factory = new ObjectFactory();\r\n\r\n    @Autowired\r\n    private MyService myService;\r\n\r\n    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getHelloRequest")\r\n    @ResponsePayload\r\n    public GetHelloResponse sayHello(@RequestPayload GetHelloRequest request) {\r\n        GetHelloResponse response = new GetHelloResponse();\r\n        response.setHelloEcho("Hello " + request.getPersonName());\r\n        return response;\r\n    }\r\n}\r\n\n'})})]})}function p(e={}){const{wrapper:r}={...(0,s.R)(),...e.components};return r?(0,a.jsx)(r,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},8453:(e,r,n)=>{n.d(r,{R:()=>i,x:()=>l});var a=n(6540);const s={},t=a.createContext(s);function i(e){const r=a.useContext(t);return a.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function l(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),a.createElement(t.Provider,{value:r},e.children)}}}]);