# Spring


## Turn off some autoconfig


We can turn off some autoconfiguation putting it into the test/resources/application.yml
E.g. Redis


```
spring:
  profiles: no-redis
  autoconfigure:
    exclude:
      - org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration
```


## Redis and TLS

```
    JAVA_OPTS: '-Delastic.apm.service_name=app-name -Djavax.net.debug=all -Djavax.net.ssl.trustStoreType=PKCS12 -Djavax.net.ssl.trustStore=/app/BOOT-INF/classes/my-truststore.p12 -Djavax.net.ssl.trustStorePassword=changeit'
```


## Turn off web security

```java

@EnableWebSecurity
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/**");
    }
}
```


## Spring Data


```java
@Configuration
public class MyDatabaseConfig {

    @Bean
    @ConfigurationProperties("my.datasource")
    public DataSourceProperties myDataSourceProperties() {
        return new DataSourceProperties();
    }

    //looks like that is wrong. We need to inject this bean as parameter instead call directly
    @Bean(name = "myDatasource")
    public DataSource myDatasource() {
        return myDataSourceProperties().initializeDataSourceBuilder().build();
    }
}

```



## Cache


```java

@Configuration
@EnableCaching
@Slf4j
public class CacheConfiguration {
    public static final String NAE_SESSION = "naeCache";

    @Bean
    public org.springframework.cache.CacheManager cacheManager() {
        CacheManager cacheManager = CacheManager.create();
        log.info("CacheManager was created {}", cacheManager);

        if (!cacheManager.cacheExists(NAE_SESSION)) {
            cacheManager.addCache(NAE_SESSION);
            log.info("cache {} was added to the CacheManager", NAE_SESSION);
        }

        cacheManager.getCache(NAE_SESSION).getCacheEventNotificationService().registerListener(new EhcacheEventListener());
        log.info("Listener {} was added to a cache", cacheManager.getCache(NAE_SESSION).getCacheEventNotificationService().getCacheEventListeners());

        return new EhCacheCacheManager(cacheManager);
    }

    static class EhcacheEventListener implements net.sf.ehcache.event.CacheEventListener {

        @Override
        public void notifyElementRemoved(Ehcache cache, Element element) {
            NAESessionInterface naeSession = (NAESessionInterface) element.getObjectValue();
            if (naeSession != null) {
                naeSession.closeSession();
                log.debug("Session for element {} was closed before removing", element);
            }
            log.info("Expired session for element {} was removed", element);
        }

        @Override
        public void notifyElementPut(Ehcache cache, Element element) {
            log.debug("Added a new NAE session {} into cache ", element);
        }

        @Override
        public void notifyElementUpdated(Ehcache cache, Element element) {
            log.debug("Element {} updated", element);
        }

        @Override
        public void notifyElementExpired(Ehcache cache, Element element) {
            NAESessionInterface naeSession = (NAESessionInterface) element.getObjectValue();
            if (naeSession != null) {
                naeSession.closeSession();
                log.debug("Expired session for element {} was closed", element);
            }
            log.info("Session for element {} expired", element);
        }

        @Override
        public void notifyElementEvicted(Ehcache cache, Element element) {
        }

        @Override
        public void notifyRemoveAll(Ehcache cache) {
        }

        @Override
        public Object clone() throws CloneNotSupportedException {
            return super.clone();
        }

        @Override
        public void dispose() {

        }
    }
}
```


## Migration to Spring 6

### Security

Replace with beans

https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter

```java
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.csrf()
                .disable()
                .authorizeHttpRequests((auth) -> auth.anyRequest().permitAll());
        return http.build();
    }
}
```


### Configuration

You may need:

```yaml
spring:
  main:
    allow-circular-references: true
  config:
    import: 'optional:configserver:'
```
