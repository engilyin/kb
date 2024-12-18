"use strict";(self.webpackChunkalex_ilin_kb=self.webpackChunkalex_ilin_kb||[]).push([[5205],{9752:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>i,contentTitle:()=>t,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"Cloud/Other/pcf","title":"PCF useful commands","description":"bind service with params on Windows from cmd","source":"@site/docs/Cloud/Other/pcf.md","sourceDirName":"Cloud/Other","slug":"/Cloud/Other/pcf","permalink":"/kb/Cloud/Other/pcf","draft":false,"unlisted":false,"editUrl":"https://github.com/engilyin/kb/docs/Cloud/Other/pcf.md","tags":[],"version":"current","lastUpdatedAt":1727544268000,"frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"GCS Bucket","permalink":"/kb/Cloud/GCP/gcp-bucket"},"next":{"title":"Databases","permalink":"/kb/category/databases"}}');var a=r(4848),c=r(8453);const o={},t="PCF useful commands",i={},d=[{value:"bind service with params on Windows from cmd",id:"bind-service-with-params-on-windows-from-cmd",level:2},{value:"ssh",id:"ssh",level:2},{value:"Docker",id:"docker",level:2},{value:"How to debug PCF app",id:"how-to-debug-pcf-app",level:2},{value:"How to delete service",id:"how-to-delete-service",level:2},{value:"Change log level for the package on the fly",id:"change-log-level-for-the-package-on-the-fly",level:2},{value:"Java 11",id:"java-11",level:2}];function l(e){const n={code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,c.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"pcf-useful-commands",children:"PCF useful commands"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"cf create-app-manifest APP_NAME [-p /path/to/<app-name>_manifest.yml]\r\n\r\n\r\ncf delete-orphaned-routes\r\n\r\n#delete with routes\r\ncf delete app -r\n"})}),"\n",(0,a.jsx)(n.h2,{id:"bind-service-with-params-on-windows-from-cmd",children:"bind service with params on Windows from cmd"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'cf bind-service myapp service-name -c "{\\"mount\\":\\"/opt/my/folder\\",\\"uid\\":\\"12345\\",\\"gid\\":\\"12345\\"}"\r\n\r\ncf restage myapp\n'})}),"\n",(0,a.jsx)(n.h2,{id:"ssh",children:"ssh"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"\r\ncf app <app> --guid\r\n\r\ncf curl /v2/info\r\n\r\ncf ssh-code\r\n\r\n\n"})}),"\n",(0,a.jsx)(n.p,{children:"Sample:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'\r\n? cf app myapp --guid\r\n\r\nC:\\Users\\MyUser\\tmp\r\n? cf curl /v2/info\r\n{\r\n   "name": "VMware Tanzu Application Service",\r\n   "build": "2.9.8-build.6",\r\n   "support": "https://support.pivotal.io",\r\n   "version": 0,\r\n   "description": "https://docs.pivotal.io/pivotalcf/2-9/pcf-release-notes/runtime-rn.html",\r\n   "authorization_endpoint": "https://login.sys.pcfusw1dev.mycompany.com",\r\n   "token_endpoint": "https://uaa.sys.pcfusw1dev.mycompany.com",\r\n   "min_cli_version": "6.23.0",\r\n   "min_recommended_cli_version": "6.23.0",\r\n   "app_ssh_endpoint": "ssh.sys.pcfusw1dev.mycompany.com:2222",\r\n   "app_ssh_host_key_fingerprint": "97:ec:cf:39:9b:a9:fc:3a:8a:bf:24:36:ed:1e:f9:71",\r\n   "app_ssh_oauth_client": "ssh-proxy",\r\n   "doppler_logging_endpoint": "wss://doppler.sys.pcfusw1dev.mycompany.com:443",\r\n   "api_version": "2.145.0",\r\n   "osbapi_version": "2.15",\r\n   "routing_endpoint": "https://api.sys.pcfusw1dev.mycompany.com/routing",\r\n   "user": "2240501a-5783-4246-8d2d-e2a7ea5c1234"\r\n}\r\n\r\nC:\\Users\\MyUser\\tmp\r\n? cf ssh-code\r\noWMgbV5S9k\r\n\n'})}),"\n",(0,a.jsxs)(n.p,{children:["So we can create the WinSCP site:\r\nHost name: ssh.sys.pcfusw1dev.mycompany.com\r\nPort: 2222\r\nUsername (cf",":guid","/instance#):cf",":a3a56d05-c63a-4c99-b558-b67b79412345","/0\r\nPassword",":mypass"]}),"\n",(0,a.jsx)(n.h2,{id:"docker",children:"Docker"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"\r\ncf push <name>  --docker-image <image> -u process\r\n\r\ncf app <name>\r\n\n"})}),"\n",(0,a.jsx)(n.h2,{id:"how-to-debug-pcf-app",children:"How to debug PCF app"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'cf set-env myapp JBP_CONFIG_DEBUG "{enabled: true}"\r\ncf restage myapp\r\ncf ssh -N -T -L 8000:localhost:8000 myapp\n'})}),"\n",(0,a.jsx)(n.p,{children:"Also you may use"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:'JBP_CONFIG_JMX: "{enabled: true}"\n'})}),"\n",(0,a.jsxs)(n.p,{children:["To connect ",(0,a.jsx)(n.code,{children:"VisualVM"})," and use port 5000"]}),"\n",(0,a.jsx)(n.h2,{id:"how-to-delete-service",children:"How to delete service"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"cf delete-service SERVICE_INSTANCE [-f]\n"})}),"\n",(0,a.jsx)(n.h2,{id:"change-log-level-for-the-package-on-the-fly",children:"Change log level for the package on the fly"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"cf set-env <app name> LOGGING_LEVEL_ORG_SPRINGFRAMEWORK INFO\n"})}),"\n",(0,a.jsx)(n.h2,{id:"java-11",children:"Java 11"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"    env:\r\n      #BP_JVM_VERSION: \"11.*\" # match the Java version in pom.xml\r\n      JBP_CONFIG_OPEN_JDK_JRE: '{ \"jre\": { version: 11.+ } }'\r\n      SPRING_PROFILES_ACTIVE: gcpsbx,cloud\r\n      JAVA_OPTS: '-Djavax.net.debug=all'\n"})})]})}function p(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>o,x:()=>t});var s=r(6540);const a={},c=s.createContext(a);function o(e){const n=s.useContext(c);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),s.createElement(c.Provider,{value:n},e.children)}}}]);