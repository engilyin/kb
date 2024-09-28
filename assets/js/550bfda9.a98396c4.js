"use strict";(self.webpackChunkalex_ilin_kb=self.webpackChunkalex_ilin_kb||[]).push([[923],{435:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>p,frontMatter:()=>a,metadata:()=>o,toc:()=>c});var s=n(4848),i=n(8453);const a={id:"testing",title:"Testing",sidebar_label:"Testing",description:"Testing on Java",tags:["test","java","notes"]},r="Testing",o={id:"Development/Java/testing",title:"Testing",description:"Testing on Java",source:"@site/docs/Development/Java/testing.md",sourceDirName:"Development/Java",slug:"/Development/Java/testing",permalink:"/kb/Development/Java/testing",draft:!1,unlisted:!1,editUrl:"https://github.com/engilyin/kb/docs/Development/Java/testing.md",tags:[{inline:!0,label:"test",permalink:"/kb/tags/test"},{inline:!0,label:"java",permalink:"/kb/tags/java"},{inline:!0,label:"notes",permalink:"/kb/tags/notes"}],version:"current",lastUpdatedAt:1727331161e3,frontMatter:{id:"testing",title:"Testing",sidebar_label:"Testing",description:"Testing on Java",tags:["test","java","notes"]},sidebar:"defaultSidebar",previous:{title:"SOAP",permalink:"/kb/Development/Java/services/soap"},next:{title:"Kafka",permalink:"/kb/category/kafka"}},l={},c=[];function d(e){const t={code:"code",h1:"h1",header:"header",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"testing",children:"Testing"})}),"\n",(0,s.jsxs)(t.p,{children:["Use this annotation to initialize Mocks instead of ",(0,s.jsx)(t.code,{children:"initMocks"})," call:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-java",metastring:"showLineNumbers",children:"import static org.junit.jupiter.api.Assertions.*;\r\nimport static org.mockito.Mockito.*;\r\n\r\n@ExtendWith(MockitoExtension.class)\r\n\r\n\r\n        Mockito.verify(valOps, Mockito.times(1)).set(getKey(ID), getData(), TTL, TimeUnit.SECONDS);\r\n\r\n        assertEquals(0L, count);\r\n\r\n        assertFalse(object.isPresent());\r\n        assertTrue(object.isPresent());\r\n        assertNotNull(sp);\r\n\r\n\r\n\n"})}),"\n",(0,s.jsxs)(t.p,{children:["to keep all ",(0,s.jsx)(t.code,{children:"when"})," at ",(0,s.jsx)(t.code,{children:"setUp"})," method use notation to turn off strict unnecessary stubbing exceptions:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-java",children:"        lenient().when(redisTemplate.opsForValue()).thenReturn(valOps);\n"})})]})}function p(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>o});var s=n(6540);const i={},a=s.createContext(i);function r(e){const t=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(a.Provider,{value:t},e.children)}}}]);