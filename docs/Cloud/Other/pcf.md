# PCF useful commands


```bash
cf create-app-manifest APP_NAME [-p /path/to/<app-name>_manifest.yml]


cf delete-orphaned-routes

#delete with routes
cf delete app -r
```


## bind service with params on Windows from cmd

```bash
cf bind-service myapp service-name -c "{\"mount\":\"/opt/my/folder\",\"uid\":\"12345\",\"gid\":\"12345\"}"

cf restage myapp
```


## ssh

```bash

cf app <app> --guid

cf curl /v2/info

cf ssh-code


``` 

Sample:

```bash

? cf app myapp --guid

C:\Users\MyUser\tmp
? cf curl /v2/info
{
   "name": "VMware Tanzu Application Service",
   "build": "2.9.8-build.6",
   "support": "https://support.pivotal.io",
   "version": 0,
   "description": "https://docs.pivotal.io/pivotalcf/2-9/pcf-release-notes/runtime-rn.html",
   "authorization_endpoint": "https://login.sys.pcfusw1dev.mycompany.com",
   "token_endpoint": "https://uaa.sys.pcfusw1dev.mycompany.com",
   "min_cli_version": "6.23.0",
   "min_recommended_cli_version": "6.23.0",
   "app_ssh_endpoint": "ssh.sys.pcfusw1dev.mycompany.com:2222",
   "app_ssh_host_key_fingerprint": "97:ec:cf:39:9b:a9:fc:3a:8a:bf:24:36:ed:1e:f9:71",
   "app_ssh_oauth_client": "ssh-proxy",
   "doppler_logging_endpoint": "wss://doppler.sys.pcfusw1dev.mycompany.com:443",
   "api_version": "2.145.0",
   "osbapi_version": "2.15",
   "routing_endpoint": "https://api.sys.pcfusw1dev.mycompany.com/routing",
   "user": "2240501a-5783-4246-8d2d-e2a7ea5c1234"
}

C:\Users\MyUser\tmp
? cf ssh-code
oWMgbV5S9k

```

So we can create the WinSCP site:
Host name: ssh.sys.pcfusw1dev.mycompany.com
Port: 2222
Username (cf:guid/instance#):cf:a3a56d05-c63a-4c99-b558-b67b79412345/0
Password:mypass


## Docker

```bash

cf push <name>  --docker-image <image> -u process

cf app <name>

```



## How to debug PCF app

```bash
cf set-env myapp JBP_CONFIG_DEBUG "{enabled: true}"
cf restage myapp
cf ssh -N -T -L 8000:localhost:8000 myapp
```

Also you may use
```
JBP_CONFIG_JMX: "{enabled: true}"
```

To connect `VisualVM` and use port 5000


## How to delete service

```bash
cf delete-service SERVICE_INSTANCE [-f]
```


## Change log level for the package on the fly
```bash
cf set-env <app name> LOGGING_LEVEL_ORG_SPRINGFRAMEWORK INFO
```


## Java 11

```
    env:
      #BP_JVM_VERSION: "11.*" # match the Java version in pom.xml
      JBP_CONFIG_OPEN_JDK_JRE: '{ "jre": { version: 11.+ } }'
      SPRING_PROFILES_ACTIVE: gcpsbx,cloud
      JAVA_OPTS: '-Djavax.net.debug=all'
```
