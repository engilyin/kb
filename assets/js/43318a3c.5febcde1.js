"use strict";(self.webpackChunkalex_ilin_kb=self.webpackChunkalex_ilin_kb||[]).push([[4331],{1871:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>s,metadata:()=>t,toc:()=>c});var l=i(4848),r=i(8453);const s={},a=void 0,t={id:"Job/TechInterview/Java/core/core-java",title:"core-java",description:"Core Java",source:"@site/docs/Job/TechInterview/Java/core/core-java.md",sourceDirName:"Job/TechInterview/Java/core",slug:"/Job/TechInterview/Java/core/core-java",permalink:"/kb/Job/TechInterview/Java/core/core-java",draft:!1,unlisted:!1,editUrl:"https://github.com/engilyin/kb/docs/Job/TechInterview/Java/core/core-java.md",tags:[],version:"current",lastUpdatedAt:1727972934e3,frontMatter:{},sidebar:"defaultSidebar",previous:{title:"concurrency",permalink:"/kb/Job/TechInterview/Java/core/concurrency"},next:{title:"garbage-collection",permalink:"/kb/Job/TechInterview/Java/core/garbage-collection"}},o={},c=[{value:"Core Java",id:"core-java",level:2},{value:"Resources",id:"resources",level:3},{value:"Default init values",id:"default-init-values",level:3},{value:"String pool",id:"string-pool",level:3},{value:"Wrapper class pool",id:"wrapper-class-pool",level:3},{value:"Singleton options",id:"singleton-options",level:3},{value:"Override method rules",id:"override-method-rules",level:3},{value:"Covariant variables",id:"covariant-variables",level:3},{value:"Varargs, boxing, widening",id:"varargs-boxing-widening",level:3},{value:"Inner classes",id:"inner-classes",level:3},{value:"Reference types",id:"reference-types",level:3},{value:"Cloning",id:"cloning",level:3},{value:"Exceptions",id:"exceptions",level:3},{value:"Keyworkds",id:"keyworkds",level:3},{value:"<code>assert</code>",id:"assert",level:4}];function d(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h2,{id:"core-java",children:"Core Java"}),"\n",(0,l.jsx)(n.p,{children:"This page focuses on oddities of Core Java from an interview perspective. For basic\ntopics like inheritance, interfaces, etc. please read the book mentioned below."}),"\n",(0,l.jsx)(n.h3,{id:"resources",children:"Resources"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"http://www.amazon.in/Programmer-Study-1Z0-803-1Z0-804-Certification/dp/0071772006",children:"OCA/OCP Java SE 7 Programmer I & II Study Guide"})}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"default-init-values",children:"Default init values"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"For fields (class level variables), values are auto assigned default values."}),"\n",(0,l.jsx)(n.li,{children:"Method local variables should be manually assigned."}),"\n",(0,l.jsx)(n.li,{children:"Default values (references = null, primitives = 0, boolean = false)"}),"\n",(0,l.jsx)(n.li,{children:"Arrays initialize its elements: int[] numbers = new int[10]; will assign all ints in the array to 0."}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"string-pool",children:"String pool"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"String constants are placed in a memory pool"}),"\n",(0,l.jsx)(n.li,{children:"When retrieved, returns reference to string in the pool."}),"\n",(0,l.jsx)(n.li,{children:"Pool saves memory. New string constants with same value share same instance in the pool."}),"\n",(0,l.jsx)(n.li,{children:"String is immutable thus these values are never changed. For any updates, new string constant is created."}),"\n",(0,l.jsx)(n.li,{children:'String s = "abc" will place "abc" in pool and return its reference.'}),"\n",(0,l.jsx)(n.li,{children:'String s = new String("abc") will also place "abc" in pool, as well as allocate new memory'}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"/kb/Job/TechInterview/Java/core/jvm-internals#string-interning",children:"implementation details"})}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"wrapper-class-pool",children:"Wrapper class pool"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Boolean"}),"\n",(0,l.jsx)(n.li,{children:"Byte"}),"\n",(0,l.jsx)(n.li,{children:"Character from \\u0000 to \\u007f (7f is 127 in decimal)"}),"\n",(0,l.jsx)(n.li,{children:"Short and Integer from \u2013128 to 127"}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"singleton-options",children:"Singleton options"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Using: static final variable (init guarantee)"}),"\n",(0,l.jsx)(n.li,{children:"Using: Lazy loading (double checked)"}),"\n",(0,l.jsx)(n.li,{children:"Using: Enums (by default lazy, and init guarantee)"}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"override-method-rules",children:"Override method rules"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Same method name and parameter types"}),"\n",(0,l.jsx)(n.li,{children:"Same or a subset of super methods' checked exceptions"}),"\n",(0,l.jsx)(n.li,{children:"Any number of runtime exceptions"}),"\n",(0,l.jsx)(n.li,{children:"Same or covariant return type"}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"covariant-variables",children:"Covariant variables"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Variable types which are compatible."}),"\n",(0,l.jsx)(n.li,{children:"Eg: an int is covariant of long"}),"\n",(0,l.jsx)(n.li,{children:"Eg: an Lion class is covariant of Animal class (only if Lion extends Animal)"}),"\n",(0,l.jsx)(n.li,{children:"Can be used in parameters, return types or assignments"}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"varargs-boxing-widening",children:"Varargs, boxing, widening"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["Primitive Widening > Boxing > Varargs. ",(0,l.jsx)(n.a,{href:"http://stackoverflow.com/a/2128068/3494368",children:"Example"}),"."]}),"\n",(0,l.jsx)(n.li,{children:"Widening then Boxing not allowed."}),"\n",(0,l.jsx)(n.li,{children:"Boxing then Widening allowed."}),"\n",(0,l.jsx)(n.li,{children:"Widening between wrapper classes not allowed (eg: Long n = new Integer(10); not allowed)"}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"inner-classes",children:"Inner classes"}),"\n",(0,l.jsx)(n.p,{children:"Personally I find this part of Java to be super annoying, unnecessary and hardly ever used in real-life (especially after Java 8).\nAlso, this topic does not come up a lot in interviews, so just skimp through."}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Inner class: Can access enclosing class's variables (even private ones)"}),"\n",(0,l.jsx)(n.li,{children:"Method local inner class: Same as above. Plus, it can access final variables in encapsulating method."}),"\n",(0,l.jsx)(n.li,{children:"Anonymous inner class: Just no name, otherwise same as above."}),"\n",(0,l.jsx)(n.li,{children:"Static inner class: No special relationship with outer class."}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"reference-types",children:"Reference types"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Weak reference"})," - Eligible for GC if object not referenced by any other variables. Good for caches. Are enqueued in ReferenceQueue just before GC (object can be resurrected in finalize). Returns null once object is eligible for GC, even if object is resurrected, the weak-reference still is dead, and will return null."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Soft reference"})," - Same as above, but its GC\u2019ed only when memory is low. Excellent for caches."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"Phantom reference"})," - Even after GC, it references the object, until the memory is reclaimed. Enqueued in ReferenceQueue after complete reclamation. Always returns null, so that you cannot resurrect it. Can be helpful to check when memory is reclaimed so that you can load next large object."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.strong,{children:"WeakHashMap"})," - Weak keys. Removes entry once key is GC\u2019ed."]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"cloning",children:"Cloning"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"clone method (protected) of Object class returns shallow copy. Need to be explicitly cast back."}),"\n",(0,l.jsx)(n.li,{children:"Requires class to implement Cloneable marker interface. Else returns CloneNotSupportedException"}),"\n",(0,l.jsx)(n.li,{children:"Singletons should override clone method and throw CloneNotSupportedException"}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"/kb/Job/TechInterview/Java/design/effective-java#clone",children:"More details"})}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"exceptions",children:"Exceptions"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"try"})," can be used alone in case of ",(0,l.jsx)(n.code,{children:"try-with-resources"})]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"try"})," can be used with ",(0,l.jsx)(n.code,{children:"finally"})," without having ",(0,l.jsx)(n.code,{children:"catch"})," clause"]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-java",children:'import java.util.*;\n\npublic class Main {\n\n  public void divide(int a, int b) {\n    try {\n      int c = a / b;\n    } finally {\n      System.out.println(">>finally");\n    }\n  }\n\n    public static void main(String[] args) {\n        Main obj = new Main();\n        try {\n          obj.divide(3, 0);\n        } catch (RuntimeException e) {\n          System.out.println("RuntimeException");\n        } catch (Exception e) {\n          System.out.println("Exception");\n        } finally {\n          System.out.println(">finally");\n        }\n    }\n}\n'})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:">>finally\nRuntimeException\n>finally\n"})}),"\n",(0,l.jsx)(n.h3,{id:"keyworkds",children:"Keyworkds"}),"\n",(0,l.jsx)(n.h4,{id:"assert",children:(0,l.jsx)(n.code,{children:"assert"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["Activated at run-time using ",(0,l.jsx)(n.code,{children:"-ea"})," flag."]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(d,{...e})}):d(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>a,x:()=>t});var l=i(6540);const r={},s=l.createContext(r);function a(e){const n=l.useContext(s);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),l.createElement(s.Provider,{value:n},e.children)}}}]);