"use strict";(self.webpackChunkalex_ilin_kb=self.webpackChunkalex_ilin_kb||[]).push([[8575],{7230:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>o});var i=s(4848),t=s(8453);const r={},l=void 0,a={id:"Job/TechInterview/Java/design/effective-java",title:"effective-java",description:"Effective Java",source:"@site/docs/Job/TechInterview/Java/design/effective-java.md",sourceDirName:"Job/TechInterview/Java/design",slug:"/Job/TechInterview/Java/design/effective-java",permalink:"/kb/Job/TechInterview/Java/design/effective-java",draft:!1,unlisted:!1,editUrl:"https://github.com/engilyin/kb/docs/Job/TechInterview/Java/design/effective-java.md",tags:[],version:"current",lastUpdatedAt:1727972934e3,frontMatter:{},sidebar:"defaultSidebar",previous:{title:"design-patterns",permalink:"/kb/Job/TechInterview/Java/design/design-patterns"},next:{title:"solid",permalink:"/kb/Job/TechInterview/Java/design/solid"}},c={},o=[{value:"Effective Java",id:"effective-java",level:2},{value:"Resources",id:"resources",level:4},{value:"Table of Contents",id:"table-of-contents",level:3},{value:"Creating and Destroying Objects",id:"creating-and-destroying-objects",level:3},{value:"Consider static builders",id:"consider-static-builders",level:4},{value:"Service Interface Pattern",id:"service-interface-pattern",level:4},{value:"Builder pattern",id:"builder-pattern",level:4},{value:"Singleton with private instance or enum",id:"singleton-with-private-instance-or-enum",level:4},{value:"Private Constructor",id:"private-constructor",level:4},{value:"Avoid creating unnecessary objects",id:"avoid-creating-unnecessary-objects",level:4},{value:"Clear memory references",id:"clear-memory-references",level:4},{value:"Avoid finalizers",id:"avoid-finalizers",level:4},{value:"Methods common to all objects",id:"methods-common-to-all-objects",level:3},{value:"equals",id:"equals",level:4},{value:"hashcode",id:"hashcode",level:4},{value:"toString",id:"tostring",level:4},{value:"clone",id:"clone",level:4},{value:"comparable",id:"comparable",level:4},{value:"Classes and Interfaces",id:"classes-and-interfaces",level:3},{value:"Accessibility",id:"accessibility",level:4},{value:"Private fields with accessor methods",id:"private-fields-with-accessor-methods",level:4},{value:"Make fields as much immutable as possible",id:"make-fields-as-much-immutable-as-possible",level:4},{value:"Composition over inheritance",id:"composition-over-inheritance",level:4},{value:"Override in inheritance",id:"override-in-inheritance",level:4},{value:"Prefer interfaces to abstract classes",id:"prefer-interfaces-to-abstract-classes",level:4},{value:"Class hierarchies over tagged classes",id:"class-hierarchies-over-tagged-classes",level:4},{value:"Function objects to represent strategies",id:"function-objects-to-represent-strategies",level:4},{value:"Favor static member class over non-static",id:"favor-static-member-class-over-non-static",level:4},{value:"Generics",id:"generics",level:3},{value:"Don&#39;t use Raw types",id:"dont-use-raw-types",level:4},{value:"Prefer Lists to arrays",id:"prefer-lists-to-arrays",level:4},{value:"Enums and Annotations",id:"enums-and-annotations",level:3},{value:"Enums instead of int constants",id:"enums-instead-of-int-constants",level:4},{value:"Prefer annotations over naming patterns",id:"prefer-annotations-over-naming-patterns",level:4},{value:"Methods",id:"methods",level:3},{value:"Definition",id:"definition",level:4},{value:"Var args",id:"var-args",level:4},{value:"Return empty collections instead of null",id:"return-empty-collections-instead-of-null",level:4},{value:"General",id:"general",level:3},{value:"Use Serializable Judiciously",id:"use-serializable-judiciously",level:4}];function d(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{id:"effective-java",children:"Effective Java"}),"\n",(0,i.jsx)(n.h4,{id:"resources",children:"Resources"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://www.amazon.com/Effective-Java-2nd-Joshua-Bloch/dp/0321356683",children:"Effective Java by Joshua Bloch"})," -- Highly recommended"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"table-of-contents",children:"Table of Contents"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"#effective-java",children:"Effective Java"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#resources",children:"Resources"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#table-of-contents",children:"Table of Contents"})}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"#creating-and-destroying-objects",children:"Creating and Destroying Objects"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#consider-static-builders",children:"Consider static builders"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#service-interface-pattern",children:"Service Interface Pattern"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#builder-pattern",children:"Builder pattern"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#singleton-with-private-instance-or-enum",children:"Singleton with private instance or enum"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#private-constructor",children:"Private Constructor"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#avoid-creating-unnecessary-objects",children:"Avoid creating unnecessary objects"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#clear-memory-references",children:"Clear memory references"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#avoid-finalizers",children:"Avoid finalizers"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"#methods-common-to-all-objects",children:"Methods common to all objects"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#equals",children:"equals"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#hashcode",children:"hashcode"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#tostring",children:"toString"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#clone",children:"clone"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#comparable",children:"comparable"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"#classes-and-interfaces",children:"Classes and Interfaces"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#accessibility",children:"Accessibility"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#private-fields-with-accessor-methods",children:"Private fields with accessor methods"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#make-fields-as-much-immutable-as-possible",children:"Make fields as much immutable as possible"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#composition-over-inheritance",children:"Composition over inheritance"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#override-in-inheritance",children:"Override in inheritance"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#prefer-interfaces-to-abstract-classes",children:"Prefer interfaces to abstract classes"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#class-hierarchies-over-tagged-classes",children:"Class hierarchies over tagged classes"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#function-objects-to-represent-strategies",children:"Function objects to represent strategies"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#favor-static-member-class-over-non-static",children:"Favor static member class over non-static"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"#generics",children:"Generics"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#dont-use-raw-types",children:"Don't use Raw types"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#prefer-lists-to-arrays",children:"Prefer Lists to arrays"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"#enums-and-annotations",children:"Enums and Annotations"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#enums-instead-of-int-constants",children:"Enums instead of int constants"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#prefer-annotations-over-naming-patterns",children:"Prefer annotations over naming patterns"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"#methods",children:"Methods"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#definition",children:"Definition"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#var-args",children:"Var args"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#return-empty-collections-instead-of-null",children:"Return empty collections instead of null"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"#general",children:"General"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"#use-serializable-judiciously",children:"Use Serializable Judiciously"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"creating-and-destroying-objects",children:"Creating and Destroying Objects"}),"\n",(0,i.jsx)(n.h4,{id:"consider-static-builders",children:"Consider static builders"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"They can have any name, thus can have multiple methods with same parameters (unlike constructors)"}),"\n",(0,i.jsx)(n.li,{children:"They can return cached objects (eg: Boolean.valueOf)"}),"\n",(0,i.jsx)(n.li,{children:"They can return their subtype, even class objects which are not public. Eg: Collection has 32 factory methods, return type of many are non-public classes. Ofcourse, the interface they extend is public. Returning such interface backed classes, also help in returning specific type based on argument. Eg: EnumSet returns RegularEnumSet or JumboEnumSet based on the argument. In future, JDK can add more types, without client/caller knowing about them. See service interface pattern below"}),"\n",(0,i.jsx)(n.li,{children:"They can reduce verbosity of parameterized types. Eg: Maps.newHashMap()"}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"service-interface-pattern",children:"Service Interface Pattern"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Here same pattern as above, where the implementation classes are not even known upfront."}),"\n",(0,i.jsx)(n.li,{children:"Example: JDBC connection driver classes. DriverManager.registerDriver, and DriverManager.getConnection."}),"\n",(0,i.jsx)(n.li,{children:"It needs to provide, registration API and then get service API"}),"\n",(0,i.jsx)(n.li,{children:"Cannot subclass and take advantage of constructors. Though this enforces Composition instead of inheritance, so its not so bad."}),"\n",(0,i.jsx)(n.li,{children:"Cannot easily distinguish between constructing methods, and other methods. Need to use some convention to make it easy. Eg: newInstance, valueOf, of etc."}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"builder-pattern",children:"Builder pattern"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"When too many parameters use builders instead."}),"\n",(0,i.jsx)(n.li,{children:"In Builders, each parameter setting can be through a good name method. In constructor its difficult to remember."}),"\n",(0,i.jsx)(n.li,{children:"Can easily add optional parameter support."}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"singleton-with-private-instance-or-enum",children:"Singleton with private instance or enum"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"static final variable (also provides init guarantee)"}),"\n",(0,i.jsx)(n.li,{children:"Lazy loading (double checked)"}),"\n",(0,i.jsx)(n.li,{children:"Enums (by default lazy, and provides init guarantee)"}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"private-constructor",children:"Private Constructor"}),"\n",(0,i.jsx)(n.h4,{id:"avoid-creating-unnecessary-objects",children:"Avoid creating unnecessary objects"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:'Eg: Sring abc = new String("some value"); instead use String abc = "some value";'}),"\n",(0,i.jsx)(n.li,{children:"Choose primitives over boxed, check for unnecessary boxing and unboxing"}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"clear-memory-references",children:"Clear memory references"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Let objects go out of scope quickly"}),"\n",(0,i.jsx)(n.li,{children:"If not, nullify reference (eg: Stack.pop, within method, elements[size] = null)"}),"\n",(0,i.jsx)(n.li,{children:"Check caches and message listeners, they hold references"}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"avoid-finalizers",children:"Avoid finalizers"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"JVM does not guarantee they will be called"}),"\n",(0,i.jsx)(n.li,{children:"If called, they can be called anytime, not immediately after object is eligible for GC"}),"\n",(0,i.jsx)(n.li,{children:"Never release resource in finalizer, if it does not run, the resource will still be lock (or in inconsistent state)"}),"\n",(0,i.jsx)(n.li,{children:"Hampers performance"}),"\n",(0,i.jsx)(n.li,{children:"Instead use explicit close methods like OutputStream, java.sql.Connection etc"}),"\n",(0,i.jsx)(n.li,{children:"These classes also use finalizers, but that is safety net"}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"methods-common-to-all-objects",children:"Methods common to all objects"}),"\n",(0,i.jsx)(n.h4,{id:"equals",children:"equals"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"If super class has implemented equals, then its okay to not implement (eg: Set used AbstractSet)"}),"\n",(0,i.jsx)(n.li,{children:"Reflexive (equal to self), transitive, symmetric, consistent (unless modified)"}),"\n",(0,i.jsx)(n.li,{children:"Maintain Liskov Substitution Principle, within equals (don't check o.getClass() == this.getClass() instead check with instanceof"}),"\n",(0,i.jsx)(n.li,{children:"Consistent - Don't use external resources (eg: IP address)"}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"hashcode",children:"hashcode"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"every class which overrides equals must have it"}),"\n",(0,i.jsx)(n.li,{children:"Consistent across multiple calls"}),"\n",(0,i.jsx)(n.li,{children:"Dont use any fields, which are not used for equals"}),"\n",(0,i.jsx)(n.li,{children:"You can exclude redundant fields (ones which are always same for all objects)"}),"\n",(0,i.jsx)(n.li,{children:"You can cache the hashcode and return that (like String class), but then need to track if value is modified."}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"tostring",children:"toString"}),"\n",(0,i.jsx)(n.h4,{id:"clone",children:"clone"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Cloneable interface. Its a mixin interface. Does not have clone method."}),"\n",(0,i.jsx)(n.li,{children:"Object class's clone method is protected"}),"\n",(0,i.jsx)(n.li,{children:"Atypical - Presence of Colenable modifies behavior of Object.clone() behavior. If present it returns object which is field by field copy, and if not present, then .clone method throws CloneNotSupportedException"}),"\n",(0,i.jsx)(n.li,{children:"Cloning is not done using constructor"}),"\n",(0,i.jsx)(n.li,{children:"If you override clone do return super.clone(), if all classes do that up the chain, then Object.clone will be called and you will get the right copy"}),"\n",(0,i.jsx)(n.li,{children:"This is important because spec doesnt enforce anything from Cloneable interface. So someone might override clone and not clone, nor call super.clone, causing problems"}),"\n",(0,i.jsx)(n.li,{children:"Note: Objects.clone() creates a shallow copy"}),"\n",(0,i.jsx)(n.li,{children:"If you override and write clone, ofcourse you cannot set final field, thus need to remove final modifiers"}),"\n",(0,i.jsx)(n.li,{children:"Object's clone method is declared to throw CloneNotSupportedException, but overriding clone methods can omit this declaration."}),"\n",(0,i.jsx)(n.li,{children:"Like constructor, clone method should not call non-final methods, because super object might not be properly constructed yet, causing some data corruption"}),"\n",(0,i.jsx)(n.li,{children:"Clone method must be synchronized in case of concurrency"}),"\n",(0,i.jsx)(n.li,{children:"In short, you are better off, creating and using a copy-constructor"}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"comparable",children:"comparable"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Opposing sign for symmetry x.compareTo(y) == -y.compareTo(x)"}),"\n",(0,i.jsx)(n.li,{children:"If compareTo returns 0, objects should ideally be equal (but thats not in contract)"}),"\n",(0,i.jsx)(n.li,{children:'Weird: Inserting new BigDecimal("1.0") and new BigDecimal("1.00") in HashSet stores 2 elements (they use equals), while TreeSet stores only 1 element (they use compareTo)'}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"classes-and-interfaces",children:"Classes and Interfaces"}),"\n",(0,i.jsx)(n.h4,{id:"accessibility",children:"Accessibility"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Make fields, classes etc as much inaccessible as possible (private, protected, package, then public)"}),"\n",(0,i.jsx)(n.li,{children:"Anything that is public is now part of API, thus difficult to make private later"}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"private-fields-with-accessor-methods",children:"Private fields with accessor methods"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Helps in validating inputs (setters)"}),"\n",(0,i.jsx)(n.li,{children:"Helps in returning copies in outputs (getters)"}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"make-fields-as-much-immutable-as-possible",children:"Make fields as much immutable as possible"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Immutable objects are simple"}),"\n",(0,i.jsx)(n.li,{children:"They are thread-safe"}),"\n",(0,i.jsx)(n.li,{children:"They can be shared freely"}),"\n",(0,i.jsx)(n.li,{children:"They can expose their internals"}),"\n",(0,i.jsx)(n.li,{children:"Can take advantage of cached hashCode & lazyInit hashCode"}),"\n",(0,i.jsx)(n.li,{children:"Only disadvantage is memory use"}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"composition-over-inheritance",children:"Composition over inheritance"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Inheritance violates encapsulation, if super class changes sub-class behavior changes even if its not touched"}),"\n",(0,i.jsx)(n.li,{children:"Super class can later add method, sub-class havent thought of"}),"\n",(0,i.jsx)(n.li,{children:"In fact, it can add method which mutates the state which sub-class never promised to do."}),"\n",(0,i.jsx)(n.li,{children:"If you add your own methods in sub-class, and later super-class adds same name method its a problem. Either it may not compile based on return type, or contract of that method in super might be different than subclass method."}),"\n",(0,i.jsx)(n.li,{children:"Instead use composition and forward/delegate the calls"}),"\n",(0,i.jsx)(n.li,{children:"Such classes are called Wrapper classes (decoration pattern)"}),"\n",(0,i.jsx)(n.li,{children:"Only problem is library/frameworks do not know of your class type, and can't trigger message callbacks and such."}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"override-in-inheritance",children:"Override in inheritance"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Constructor must not call method (which is overridden), because super() constructor will call override() of subclass, which is not yet constructed"}),"\n",(0,i.jsx)(n.li,{children:"Same problems can occur with clone and readObject (so avoid inheritance with Cloneable and Serializable)"}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"prefer-interfaces-to-abstract-classes",children:"Prefer interfaces to abstract classes"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Classes can be retrofitted to have more interfaces"}),"\n",(0,i.jsx)(n.li,{children:"Interfaces allow mix-in types (markup), without need to implement any methods"}),"\n",(0,i.jsx)(n.li,{children:"Interfaces allow cross-types (eg: SingerWriter implements Singer, Writer)"}),"\n",(0,i.jsx)(n.li,{children:"Interfaces are not allowed methods, but Skeleton types can be created. Eg: AbstractSet, AbstractList etc. These classes help create concrete implementations by providing part of functionality"}),"\n",(0,i.jsx)(n.li,{children:"If class cannot extend Skeletal (Abstract) class, we can implement the Interface, and have Skeletal class instance as composition field, and delegate all interface methods, to skeletal class instance. This is called, simulated multiple inheritance."}),"\n",(0,i.jsx)(n.li,{children:"Disadvantage: Once release, interfaces are impossible to change (all implementations need to be updated)"}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"class-hierarchies-over-tagged-classes",children:"Class hierarchies over tagged classes"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Lot of boilerplate in tagged classes: Enums, fields, switch statements"}),"\n",(0,i.jsx)(n.li,{children:"Memory issue: Tagged classes can contains fields specific for one type, but object of all types will have those extra fields."}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"function-objects-to-represent-strategies",children:"Function objects to represent strategies"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Use classes (stateless) to represent computation. This can be passed around. Ex: StringLengthComparator"}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"favor-static-member-class-over-non-static",children:"Favor static member class over non-static"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Every non-static class object has instance of enclosing class. Takes more memory."}),"\n",(0,i.jsx)(n.li,{children:"Non-static class instances cannot be created without creating instances of enclosing class"}),"\n",(0,i.jsx)(n.li,{children:"Though one valid use of non-static class is, implementing Iterator for the class"}),"\n",(0,i.jsx)(n.li,{children:"Static classes are typically used to create Helper classes"}),"\n",(0,i.jsx)(n.li,{children:"Defining them public or private depends on whether you want to expose it in API"}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"generics",children:"Generics"}),"\n",(0,i.jsx)(n.h4,{id:"dont-use-raw-types",children:"Don't use Raw types"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Using types in all reference variables, helps in safety and avoiding boilerplate of casting"}),"\n",(0,i.jsxs)(n.li,{children:["Use generic fields (",(0,i.jsx)(n.code,{children:"public E element"}),") in class"]}),"\n",(0,i.jsxs)(n.li,{children:["Use generic methods (",(0,i.jsx)(n.code,{children:"public static <E> Set<E> union(Set<E> s1, Set<E> s2)"}),").. ",(0,i.jsx)(n.code,{children:"<E>"})," helps in type inference"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"prefer-lists-to-arrays",children:"Prefer Lists to arrays"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:'Arrays are covariant (Object[] a = new Long[]), but it fails at runtime (a[0] = "string value");'}),"\n",(0,i.jsx)(n.li,{children:"Arrays retain types at runtime (reified) thus they throw ArrayStoreExceptions. Lists (generics) do type erasure at compile time."}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"enums-and-annotations",children:"Enums and Annotations"}),"\n",(0,i.jsx)(n.h4,{id:"enums-instead-of-int-constants",children:"Enums instead of int constants"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Enums provide name space. If you use int constants for 2 different Type hierarchies (AppleTypes & OrangeTypes), you can pass value of one to method of another, accidently, and compiler wont complain"}),"\n",(0,i.jsx)(n.li,{children:"Enums are iterable. Cannot iterate over int constants"}),"\n",(0,i.jsx)(n.li,{children:"Enums have default toString. Cannot sysout int constants (they will print numbers which are not helpful)"}),"\n",(0,i.jsx)(n.li,{children:"You can extend functionality of enums"}),"\n",(0,i.jsx)(n.li,{children:"Enums can be based on multiple fields"}),"\n",(0,i.jsx)(n.li,{children:"EnumSet instead of Bit set (way to define union of types eg: STYLE_BOLD | STYLE_ITALIC), instead just use EnumSet.of(STYLE_BOLD, STYLE_ITALIC)."}),"\n",(0,i.jsx)(n.li,{children:"EnumMap"}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"prefer-annotations-over-naming-patterns",children:"Prefer annotations over naming patterns"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Eg: @Test instead of all method names starting with test"}),"\n",(0,i.jsx)(n.li,{children:"Annotations have retention policy. Eg: RetentionPolicy.RUNTIME"}),"\n",(0,i.jsx)(n.li,{children:"Annotations have target. Eg: @Target(ElementType.METHOD)"}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"methods",children:"Methods"}),"\n",(0,i.jsx)(n.h4,{id:"definition",children:"Definition"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Choose method names carefully - they are part of API"}),"\n",(0,i.jsx)(n.li,{children:"Choose parameter types as interfaces instead of implementations"}),"\n",(0,i.jsx)(n.li,{children:"Long list of methods with identically typed parameters is wrong"}),"\n",(0,i.jsx)(n.li,{children:"Dont have too many parameters"}),"\n",(0,i.jsx)(n.li,{children:"Prefer Enum over boolean"}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"var-args",children:"Var args"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"If method needs to take 1 or more, then have 1st param, then 2nd as var..args"}),"\n",(0,i.jsx)(n.li,{children:"Arrays.asList() was a mistake, because you can pass multiple values to it, but if you pass array to it, then it considers that as var..args with single element of type array."}),"\n",(0,i.jsx)(n.li,{children:"Instead it should have had Arrays.gather(T... args) and then return Arrays.asList(args)"}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"return-empty-collections-instead-of-null",children:"Return empty collections instead of null"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"These return values are iterable"}),"\n"]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"general",children:"General"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Avoid float and double for exact answers use BigDecimal"}),"\n",(0,i.jsx)(n.li,{children:"Avoid boxed, (== does not work), and constant boxing-unboxing consumes CPU"}),"\n",(0,i.jsx)(n.li,{children:"Use StringBuilder instead of direct concatenation"}),"\n",(0,i.jsx)(n.li,{children:"Refer to objects by their interfaces"}),"\n",(0,i.jsx)(n.li,{children:"Use checked exceptions for recoverable conditions, and runtime exceptions for programming errors"}),"\n",(0,i.jsx)(n.li,{children:"Favor standard exception like IllegalStateException, IllegalArgumentException etc"}),"\n",(0,i.jsx)(n.li,{children:"Prefer Executors and Tasks to threads"}),"\n",(0,i.jsx)(n.li,{children:"Prefer concurrency classes instead of wait notify"}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"use-serializable-judiciously",children:"Use Serializable Judiciously"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Like APIs once serialized, then cant change class structure"}),"\n",(0,i.jsx)(n.li,{children:"Increases testing burden (backwards compatible)"}),"\n",(0,i.jsx)(n.li,{children:"Increases security loopholes, because it does not use default constructor"}),"\n",(0,i.jsx)(n.li,{children:"Inheritance based classes should avoid serializable"}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>a});var i=s(6540);const t={},r=i.createContext(t);function l(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);