"use strict";(self.webpackChunkalex_ilin_kb=self.webpackChunkalex_ilin_kb||[]).push([[1772],{3385:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>t,metadata:()=>s,toc:()=>d});var a=n(4848),o=n(8453);const t={},i=void 0,s={id:"Job/TechInterview/Java/core/java-memory-model",title:"java-memory-model",description:"Java Memory Model",source:"@site/docs/Job/TechInterview/Java/core/java-memory-model.md",sourceDirName:"Job/TechInterview/Java/core",slug:"/Job/TechInterview/Java/core/java-memory-model",permalink:"/kb/Job/TechInterview/Java/core/java-memory-model",draft:!1,unlisted:!1,editUrl:"https://github.com/engilyin/kb/docs/Job/TechInterview/Java/core/java-memory-model.md",tags:[],version:"current",lastUpdatedAt:1727972934e3,frontMatter:{},sidebar:"defaultSidebar",previous:{title:"java-8",permalink:"/kb/Job/TechInterview/Java/core/java-8"},next:{title:"jvm-internals",permalink:"/kb/Job/TechInterview/Java/core/jvm-internals"}},l={},d=[{value:"Java Memory Model",id:"java-memory-model",level:2},{value:"Resources",id:"resources",level:3},{value:"What is it?",id:"what-is-it",level:3},{value:"More details",id:"more-details",level:2}];function c(e){const r={a:"a",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...(0,o.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r.h2,{id:"java-memory-model",children:"Java Memory Model"}),"\n",(0,a.jsx)(r.h3,{id:"resources",children:"Resources"}),"\n",(0,a.jsxs)(r.ul,{children:["\n",(0,a.jsxs)(r.li,{children:[(0,a.jsx)(r.a,{href:"https://vimeo.com/181788144",children:"The Java memory model made easy by Rafael Winterhalter"})," - Highly Recommended"]}),"\n"]}),"\n",(0,a.jsx)(r.h3,{id:"what-is-it",children:"What is it?"}),"\n",(0,a.jsxs)(r.ul,{children:["\n",(0,a.jsx)(r.li,{children:"Specification deciding how JVM can reorder instructions (for performance) aka ensures guaranteed ordering of of reads and writes under certain conditions (happens-before). Every JVM has to implement this spec."}),"\n",(0,a.jsx)(r.li,{children:"Barriers that forbid reordering instructions (load-load, load-store, store-load, store-store)"}),"\n",(0,a.jsxs)(r.li,{children:["Variables","\n",(0,a.jsxs)(r.ul,{children:["\n",(0,a.jsx)(r.li,{children:"volatile"}),"\n",(0,a.jsx)(r.li,{children:"final = all writes before volatile write will be reflected when/after volatile is read (potentially by other thread). Threads need to use the same volatile variable for this to work. For double/long (which occupy multiple word spaces, word-breakdown is forbidden to ensure integrity of data)."}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(r.li,{children:"Methods - synchronized"}),"\n",(0,a.jsx)(r.li,{children:"Locks - normal objects used as locks, and lock classes like ReadWriteLock."}),"\n",(0,a.jsx)(r.li,{children:"Threads - When a new thread is started, it is guaranteed to see all values written before thread started."}),"\n"]}),"\n",(0,a.jsx)(r.h2,{id:"more-details",children:"More details"}),"\n",(0,a.jsxs)(r.p,{children:["This topic overlaps quite a bit with Concurrency. Please read ",(0,a.jsx)(r.a,{href:"/kb/Job/TechInterview/Java/core/concurrency",children:"corresponding wiki page"})]})]})}function h(e={}){const{wrapper:r}={...(0,o.R)(),...e.components};return r?(0,a.jsx)(r,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},8453:(e,r,n)=>{n.d(r,{R:()=>i,x:()=>s});var a=n(6540);const o={},t=a.createContext(o);function i(e){const r=a.useContext(t);return a.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function s(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),a.createElement(t.Provider,{value:r},e.children)}}}]);