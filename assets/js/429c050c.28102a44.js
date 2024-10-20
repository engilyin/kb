"use strict";(self.webpackChunkalex_ilin_kb=self.webpackChunkalex_ilin_kb||[]).push([[1259],{6937:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>r,contentTitle:()=>l,default:()=>h,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var t=n(4848),o=n(8453);const a={},l=void 0,s={id:"Job/TechInterview/Java/opinion/myanswers",title:"myanswers",description:"Importance of Compile Time vs JIT",source:"@site/docs/Job/TechInterview/Java/opinion/myanswers.md",sourceDirName:"Job/TechInterview/Java/opinion",slug:"/Job/TechInterview/Java/opinion/myanswers",permalink:"/kb/Job/TechInterview/Java/opinion/myanswers",draft:!1,unlisted:!1,editUrl:"https://github.com/engilyin/kb/docs/Job/TechInterview/Java/opinion/myanswers.md",tags:[],version:"current",lastUpdatedAt:1727972934e3,frontMatter:{},sidebar:"defaultSidebar",previous:{title:"testing",permalink:"/kb/Job/TechInterview/Java/design/testing"},next:{title:"common-coding-problems",permalink:"/kb/Job/TechInterview/Java/problem-solving/common-coding-problems"}},r={},c=[{value:"Importance of Compile Time vs JIT",id:"importance-of-compile-time-vs-jit",level:2},{value:"What do you like about Java",id:"what-do-you-like-about-java",level:2},{value:"What do you not like about Java",id:"what-do-you-not-like-about-java",level:2}];function d(e){const i={h2:"h2",li:"li",ul:"ul",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.h2,{id:"importance-of-compile-time-vs-jit",children:"Importance of Compile Time vs JIT"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"In compile - code is converted directly to architecture (machine language). Example: Go"}),"\n",(0,t.jsx)(i.li,{children:"In JIT - code is converted at runtime, just before"}),"\n",(0,t.jsx)(i.li,{children:"Advantage: it can check availability of resources (RAM, CPU etc) and decide on corresponding optimizations"}),"\n",(0,t.jsx)(i.li,{children:"Advantage: it can keep running for a while a find hot snippets of code, and optimize them even further. Eg: Android 7"}),"\n",(0,t.jsx)(i.li,{children:"Disadvantage: introduces latency during startup (for conversion)"}),"\n",(0,t.jsx)(i.li,{children:"Disadvantage: have to perform conversion every time during application start (cannot save and re-use the best optimization results)"}),"\n"]}),"\n",(0,t.jsx)(i.h2,{id:"what-do-you-like-about-java",children:"What do you like about Java"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"Performance (Eg: Memory allocation). Thanks to years of iterative work on the JVM it is very performant. JIT Compilation."}),"\n",(0,t.jsx)(i.li,{children:"Garbage Collection. Algorithms keep improving."}),"\n",(0,t.jsx)(i.li,{children:"Ecosystem (Vast number of mature, stable libraries, frameworks, IDEs, Tools available)"}),"\n",(0,t.jsx)(i.li,{children:"Applicable to multiple use cases - Low Latency Trading apps, Web server, Batch Backend, etc."}),"\n"]}),"\n",(0,t.jsx)(i.h2,{id:"what-do-you-not-like-about-java",children:"What do you not like about Java"}),"\n",(0,t.jsxs)(i.ul,{children:["\n",(0,t.jsx)(i.li,{children:"Verbosity - It is very difficult to write succinct code in Java. Too much boilerplate. Slightly subsidised by lambdas."}),"\n",(0,t.jsx)(i.li,{children:"Threads could be less expensive akin to Go channels or Kotlin co-routines."}),"\n",(0,t.jsx)(i.li,{children:"Message passing and Immutability are not baked-in."}),"\n",(0,t.jsx)(i.li,{children:"Thread communication by sharing memory is brittle (that is why so many locks are introduced), difficult to developers at all skill levels to write correct code."}),"\n",(0,t.jsx)(i.li,{children:"I wish primitives could be directly added to collections and used as list"}),"\n",(0,t.jsx)(i.li,{children:"Null-checks (no ?. operator). Lot of boilerplate code and time wasted in checking for nulls. Especially in finance industry where POJOs have deeply nested structure. Doing a.getB().getC().getD() cannot be written. Every object needs to be null checked."}),"\n",(0,t.jsx)(i.li,{children:"No tuples (especially helpful in multiple return types which currently have to be put in HashMap)"}),"\n",(0,t.jsx)(i.li,{children:"In fact, just check the kotlin language list"}),"\n",(0,t.jsx)(i.li,{children:"All pojos have to write getter, setter, equals, hash, clone/copy\u2026 kotlin fixes this"}),"\n",(0,t.jsx)(i.li,{children:"No built-in lightweight UI framework - They failed with JavaFX, Applets, etc."}),"\n"]})]})}function h(e={}){const{wrapper:i}={...(0,o.R)(),...e.components};return i?(0,t.jsx)(i,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,i,n)=>{n.d(i,{R:()=>l,x:()=>s});var t=n(6540);const o={},a=t.createContext(o);function l(e){const i=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function s(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:l(e.components),t.createElement(a.Provider,{value:i},e.children)}}}]);