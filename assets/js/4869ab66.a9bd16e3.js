"use strict";(self.webpackChunkalex_ilin_kb=self.webpackChunkalex_ilin_kb||[]).push([[7261],{4064:(n,e,r)=>{r.r(e),r.d(e,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>i,metadata:()=>o,toc:()=>l});var a=r(4848),t=r(8453);const i={id:"hibirnate",title:"Hibirnate",sidebar_label:"Hibirnate",description:"The notes about Hibirnate",tags:["Hibirnate","java","db","notes"]},s="Hibirnate",o={id:"Development/Java/db/hibirnate",title:"Hibirnate",description:"The notes about Hibirnate",source:"@site/docs/Development/Java/db/hibirnate.md",sourceDirName:"Development/Java/db",slug:"/Development/Java/db/hibirnate",permalink:"/kb/Development/Java/db/hibirnate",draft:!1,unlisted:!1,editUrl:"https://github.com/engilyin/kb/docs/Development/Java/db/hibirnate.md",tags:[{inline:!0,label:"Hibirnate",permalink:"/kb/tags/hibirnate"},{inline:!0,label:"java",permalink:"/kb/tags/java"},{inline:!0,label:"db",permalink:"/kb/tags/db"},{inline:!0,label:"notes",permalink:"/kb/tags/notes"}],version:"current",lastUpdatedAt:1727331161e3,frontMatter:{id:"hibirnate",title:"Hibirnate",sidebar_label:"Hibirnate",description:"The notes about Hibirnate",tags:["Hibirnate","java","db","notes"]},sidebar:"defaultSidebar",previous:{title:"Spring",permalink:"/kb/Development/Java/Spring/"},next:{title:"Dependencies",permalink:"/kb/Development/Java/dependencies"}},c={},l=[{value:"View, functions",id:"view-functions",level:2}];function m(n){const e={code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,t.R)(),...n.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.header,{children:(0,a.jsx)(e.h1,{id:"hibirnate",children:"Hibirnate"})}),"\n",(0,a.jsx)(e.h2,{id:"view-functions",children:"View, functions"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-java",metastring:"showLineNumbers",children:'@Entity\r\n@Immutable\r\n@Subselect(\r\n    "SELECT " +\r\n    "    functions.routine_name as name, " +\r\n    "    string_agg(functions.data_type, \',\') as params " +\r\n    "FROM (" +\r\n    "    SELECT " +\r\n    "        routines.routine_name, " +\r\n    "        parameters.data_type, " +\r\n    "        parameters.ordinal_position " +\r\n    "    FROM " +\r\n    "        information_schema.routines " +\r\n    "    LEFT JOIN " +\r\n    "        information_schema.parameters " +\r\n    "    ON " +\r\n    "        routines.specific_name = parameters.specific_name " +\r\n    "    WHERE " +\r\n    "        routines.specific_schema=\'public\' " +\r\n    "    ORDER BY " +\r\n    "        routines.routine_name, " +\r\n    "        parameters.ordinal_position " +\r\n    ") AS functions " +\r\n    "GROUP BY functions.routine_name"\r\n)\r\npublic class DatabaseFunction {\r\n \r\n    @Id\r\n    private String name;\r\n \r\n    private String params;\r\n \r\n    public String getName() {\r\n        return name;\r\n    }\r\n \r\n    public String[] getParams() {\r\n        return params.split(",");\r\n    }\r\n}\r\n\n'})}),"\n",(0,a.jsx)(e.p,{children:"Same can be done through the view:"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-sql",metastring:"showLineNumbers",children:"CREATE OR REPLACE VIEW database_functions AS\r\n    SELECT\r\n        functions.routine_name as name,\r\n        string_agg(functions.data_type, ',') as params\r\n    FROM (\r\n        SELECT\r\n            routines.routine_name,\r\n            parameters.data_type,\r\n            parameters.ordinal_position\r\n        FROM\r\n            information_schema.routines\r\n        LEFT JOIN\r\n            information_schema.parameters\r\n        ON\r\n            routines.specific_name = parameters.specific_name\r\n        WHERE\r\n            routines.specific_schema='public'\r\n        ORDER BY routines.routine_name, parameters.ordinal_position\r\n    ) AS functions\r\n    GROUP BY functions.routine_name;\n"})}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-java",metastring:"showLineNumbers",children:'@Entity\r\n@Immutable\r\n@Table(name = "database_functions")\r\npublic class DatabaseFunction {\r\n \r\n    @Id\r\n    private String name;\r\n \r\n    private String params;\r\n \r\n    public String getName() {\r\n        return name;\r\n    }\r\n \r\n    public String[] getParams() {\r\n        return params.split(",");\r\n    }\r\n}\n'})})]})}function p(n={}){const{wrapper:e}={...(0,t.R)(),...n.components};return e?(0,a.jsx)(e,{...n,children:(0,a.jsx)(m,{...n})}):m(n)}},8453:(n,e,r)=>{r.d(e,{R:()=>s,x:()=>o});var a=r(6540);const t={},i=a.createContext(t);function s(n){const e=a.useContext(i);return a.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:s(n.components),a.createElement(i.Provider,{value:e},n.children)}}}]);