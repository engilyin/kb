"use strict";(self.webpackChunkalex_ilin_kb=self.webpackChunkalex_ilin_kb||[]).push([[6791],{6259:(e,i,r)=>{r.r(i),r.d(i,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>a,metadata:()=>o,toc:()=>c});var n=r(4848),t=r(8453);const a={id:"serialization",title:"Serialization Libs",sidebar_label:"Serialization",description:"Serialization Libraries",tags:["serialization","java","libs","notes"]},s="Serialization Libraries",o={id:"Development/Java/serialization",title:"Serialization Libs",description:"Serialization Libraries",source:"@site/docs/Development/Java/serialization.md",sourceDirName:"Development/Java",slug:"/Development/Java/serialization",permalink:"/Development/Java/serialization",draft:!1,unlisted:!1,editUrl:"https://github.com/engilyin/kb/docs/Development/Java/serialization.md",tags:[{inline:!0,label:"serialization",permalink:"/tags/serialization"},{inline:!0,label:"java",permalink:"/tags/java"},{inline:!0,label:"libs",permalink:"/tags/libs"},{inline:!0,label:"notes",permalink:"/tags/notes"}],version:"current",lastUpdatedAt:1727331161e3,frontMatter:{id:"serialization",title:"Serialization Libs",sidebar_label:"Serialization",description:"Serialization Libraries",tags:["serialization","java","libs","notes"]},sidebar:"defaultSidebar",previous:{title:"Migration",permalink:"/Development/Java/java-migration"},next:{title:"SOAP",permalink:"/Development/Java/services/soap"}},l={},c=[{value:"Castor",id:"castor",level:2},{value:"JSON serialization",id:"json-serialization",level:2}];function d(e){const i={code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.header,{children:(0,n.jsx)(i.h1,{id:"serialization-libraries",children:"Serialization Libraries"})}),"\n",(0,n.jsx)(i.h2,{id:"castor",children:"Castor"}),"\n",(0,n.jsxs)(i.p,{children:["You need to use ",(0,n.jsx)(i.code,{children:"Xcerces"})," lib explicitly and drop the ",(0,n.jsx)(i.code,{children:"castor.properties"}),"\r\ninto your resources:"]}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:"org.exolab.castor.xml.serializer.factory=org.exolab.castor.xml.XercesXMLSerializerFactory\r\n#Default is org.exolab.castor.xml.XercesJDK5XMLSerializerFactory and it will not work with Java 9+\n"})}),"\n",(0,n.jsx)(i.h2,{id:"json-serialization",children:"JSON serialization"}),"\n",(0,n.jsx)(i.p,{children:"If you need serialize by fields and not by getters and setters:"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{className:"language-java",metastring:"showLineNumbers",children:'@Slf4j\r\npublic class Json {\r\n\r\n    private final ObjectMapper mapper;\r\n\r\n    public Json() {\r\n        this.mapper = Jackson2ObjectMapperBuilder.json()\r\n                .serializationInclusion(JsonInclude.Include.NON_NULL)\r\n                .visibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.NONE)\r\n                .visibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY)\r\n                .build();\r\n    }\r\n\r\n    public String toJson(Object object) {\r\n        if(object != null) {\r\n\r\n            try {\r\n                return mapper.writeValueAsString(object);\r\n            } catch (JsonProcessingException e) {\r\n                log.error("Unable to serialize to json the object: {}", object, e);\r\n                return "Unable to serialize to json the object: " + object;\r\n            }\r\n        }\r\n        return "";\r\n    }\r\n\r\n    public <T> T fromJson(String src, Class<T> objectClass) {\r\n        try {\r\n            return mapper.readValue(src, objectClass);\r\n        } catch (JsonProcessingException e) {\r\n            return null;\r\n        }\r\n    }\r\n\n'})})]})}function p(e={}){const{wrapper:i}={...(0,t.R)(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},8453:(e,i,r)=>{r.d(i,{R:()=>s,x:()=>o});var n=r(6540);const t={},a=n.createContext(t);function s(e){const i=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function o(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),n.createElement(a.Provider,{value:i},e.children)}}}]);