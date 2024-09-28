# Patterns


## SOLID

### SRP (Single Responsibility Principle)



### OCP (Open-Closed Principle)



### LSP (Liskov Substitution Principle)


### ISP (Interface Segregation Principle)

 Don’t depend on more than you need.

 A simple way to evaluate your class design for ISP compliance is to ask the question: “Do I need all of the methods on this interface I’m using?”
 
 The X interface violates the ISP because X, Y, and Z depend on methods they do not use.



### DIP (Dependency Inversion Principle)

1. High-level modules should not depend on low-level modules. Both should depend on abstractions.
2. Abstractions should not depend on details. Details should depend on abstractions. 
3. Avoid a source code dependency from the business logic to the database using the dependency inversion technique. 


## Other key patterns


### Tell, Don't Ask Principle


### Low coupling, high cohesion

### Objects vs Data Structures


### Law of Demeter (Principle of Least Knowledge)

Level of Objects. Each unit:
- Have limited knowledge about other units. The unit should be aware only of other units that are directly relevant. 
- Interact only with “friends”—units known to the object—and not interact with “strangers”—units unknown to the object. 

Level of Functions. Function F of an object O may only call functions of the next objects:
- O itself
- F’s parameters
- Any object instantiated within F
- O’s direct components objects
- Global variables accessible by O in the scope of F


Exceptions:
- The LoD does not apply to data structures. It is only applicable to objects.
- A Chain of Function Calls on the Same Object: The creational pattern “builder” with chain methods invocations can be considered an exception to the LoD.
- Extracting data from containers shouldn’t be considered a violation of the Law of Demeter.

The LoD Is Not Violated

```java
productFactory.getProduct("boots").getPromotion();

```

Because the goal of creational patterns is to create objects, you can consider that the getProduct() method invocation in this example is equivalent to the creation of an object with the “new” keyword.


#### The Essence of the Law of Demeter

The Law of Demeter is not about eliminating chaining methods; it is about restricting the number of interactions between non-related units to implement low coupling. 


### Boundaries


### Visitor


## Enterprice Architecture Patterns (Enterprise Integration Patterns??)


### ESB  (enterprise service bus)


### Circuite Breaker



