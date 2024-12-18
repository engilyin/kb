"use strict";(self.webpackChunkalex_ilin_kb=self.webpackChunkalex_ilin_kb||[]).push([[1537],{6114:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>o,metadata:()=>t,toc:()=>a});const t=JSON.parse('{"id":"Development/Patterns/README","title":"Patterns","description":"SOLID","source":"@site/docs/Development/Patterns/README.md","sourceDirName":"Development/Patterns","slug":"/Development/Patterns/","permalink":"/kb/Development/Patterns/","draft":false,"unlisted":false,"editUrl":"https://github.com/engilyin/kb/docs/Development/Patterns/README.md","tags":[],"version":"current","lastUpdatedAt":1727544268000,"frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"Groovy useful info","permalink":"/kb/Development/Other/groovy"},"next":{"title":"Job","permalink":"/kb/category/job"}}');var s=i(4848),r=i(8453);const o={},l="Patterns",c={},a=[{value:"SOLID",id:"solid",level:2},{value:"SRP (Single Responsibility Principle)",id:"srp-single-responsibility-principle",level:3},{value:"OCP (Open-Closed Principle)",id:"ocp-open-closed-principle",level:3},{value:"LSP (Liskov Substitution Principle)",id:"lsp-liskov-substitution-principle",level:3},{value:"ISP (Interface Segregation Principle)",id:"isp-interface-segregation-principle",level:3},{value:"DIP (Dependency Inversion Principle)",id:"dip-dependency-inversion-principle",level:3},{value:"Other key patterns",id:"other-key-patterns",level:2},{value:"Tell, Don&#39;t Ask Principle",id:"tell-dont-ask-principle",level:3},{value:"Low coupling, high cohesion",id:"low-coupling-high-cohesion",level:3},{value:"Objects vs Data Structures",id:"objects-vs-data-structures",level:3},{value:"Law of Demeter (Principle of Least Knowledge)",id:"law-of-demeter-principle-of-least-knowledge",level:3},{value:"The Essence of the Law of Demeter",id:"the-essence-of-the-law-of-demeter",level:4},{value:"Boundaries",id:"boundaries",level:3},{value:"Visitor",id:"visitor",level:3},{value:"Enterprice Architecture Patterns (Enterprise Integration Patterns??)",id:"enterprice-architecture-patterns-enterprise-integration-patterns",level:2},{value:"ESB  (enterprise service bus)",id:"esb--enterprise-service-bus",level:3},{value:"Circuite Breaker",id:"circuite-breaker",level:3}];function d(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"patterns",children:"Patterns"})}),"\n",(0,s.jsx)(n.h2,{id:"solid",children:"SOLID"}),"\n",(0,s.jsx)(n.h3,{id:"srp-single-responsibility-principle",children:"SRP (Single Responsibility Principle)"}),"\n",(0,s.jsx)(n.h3,{id:"ocp-open-closed-principle",children:"OCP (Open-Closed Principle)"}),"\n",(0,s.jsx)(n.h3,{id:"lsp-liskov-substitution-principle",children:"LSP (Liskov Substitution Principle)"}),"\n",(0,s.jsx)(n.h3,{id:"isp-interface-segregation-principle",children:"ISP (Interface Segregation Principle)"}),"\n",(0,s.jsx)(n.p,{children:"Don\u2019t depend on more than you need."}),"\n",(0,s.jsx)(n.p,{children:"A simple way to evaluate your class design for ISP compliance is to ask the question: \u201cDo I need all of the methods on this interface I\u2019m using?\u201d"}),"\n",(0,s.jsx)(n.p,{children:"The X interface violates the ISP because X, Y, and Z depend on methods they do not use."}),"\n",(0,s.jsx)(n.h3,{id:"dip-dependency-inversion-principle",children:"DIP (Dependency Inversion Principle)"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"High-level modules should not depend on low-level modules. Both should depend on abstractions."}),"\n",(0,s.jsx)(n.li,{children:"Abstractions should not depend on details. Details should depend on abstractions."}),"\n",(0,s.jsx)(n.li,{children:"Avoid a source code dependency from the business logic to the database using the dependency inversion technique."}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"other-key-patterns",children:"Other key patterns"}),"\n",(0,s.jsx)(n.h3,{id:"tell-dont-ask-principle",children:"Tell, Don't Ask Principle"}),"\n",(0,s.jsx)(n.h3,{id:"low-coupling-high-cohesion",children:"Low coupling, high cohesion"}),"\n",(0,s.jsx)(n.h3,{id:"objects-vs-data-structures",children:"Objects vs Data Structures"}),"\n",(0,s.jsx)(n.h3,{id:"law-of-demeter-principle-of-least-knowledge",children:"Law of Demeter (Principle of Least Knowledge)"}),"\n",(0,s.jsx)(n.p,{children:"Level of Objects. Each unit:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Have limited knowledge about other units. The unit should be aware only of other units that are directly relevant."}),"\n",(0,s.jsx)(n.li,{children:"Interact only with \u201cfriends\u201d\u2014units known to the object\u2014and not interact with \u201cstrangers\u201d\u2014units unknown to the object."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Level of Functions. Function F of an object O may only call functions of the next objects:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"O itself"}),"\n",(0,s.jsx)(n.li,{children:"F\u2019s parameters"}),"\n",(0,s.jsx)(n.li,{children:"Any object instantiated within F"}),"\n",(0,s.jsx)(n.li,{children:"O\u2019s direct components objects"}),"\n",(0,s.jsx)(n.li,{children:"Global variables accessible by O in the scope of F"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Exceptions:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"The LoD does not apply to data structures. It is only applicable to objects."}),"\n",(0,s.jsx)(n.li,{children:"A Chain of Function Calls on the Same Object: The creational pattern \u201cbuilder\u201d with chain methods invocations can be considered an exception to the LoD."}),"\n",(0,s.jsx)(n.li,{children:"Extracting data from containers shouldn\u2019t be considered a violation of the Law of Demeter."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"The LoD Is Not Violated"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-java",children:'productFactory.getProduct("boots").getPromotion();\n\n'})}),"\n",(0,s.jsx)(n.p,{children:"Because the goal of creational patterns is to create objects, you can consider that the getProduct() method invocation in this example is equivalent to the creation of an object with the \u201cnew\u201d keyword."}),"\n",(0,s.jsx)(n.h4,{id:"the-essence-of-the-law-of-demeter",children:"The Essence of the Law of Demeter"}),"\n",(0,s.jsx)(n.p,{children:"The Law of Demeter is not about eliminating chaining methods; it is about restricting the number of interactions between non-related units to implement low coupling."}),"\n",(0,s.jsx)(n.h3,{id:"boundaries",children:"Boundaries"}),"\n",(0,s.jsx)(n.h3,{id:"visitor",children:"Visitor"}),"\n",(0,s.jsx)(n.h2,{id:"enterprice-architecture-patterns-enterprise-integration-patterns",children:"Enterprice Architecture Patterns (Enterprise Integration Patterns??)"}),"\n",(0,s.jsx)(n.h3,{id:"esb--enterprise-service-bus",children:"ESB  (enterprise service bus)"}),"\n",(0,s.jsx)(n.h3,{id:"circuite-breaker",children:"Circuite Breaker"})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>l});var t=i(6540);const s={},r=t.createContext(s);function o(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);