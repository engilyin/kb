"use strict";(self.webpackChunkalex_ilin_kb=self.webpackChunkalex_ilin_kb||[]).push([[9893],{9533:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>r,contentTitle:()=>o,default:()=>u,frontMatter:()=>c,metadata:()=>s,toc:()=>l});var t=i(4848),a=i(8453);const c={},o="AWS",s={id:"Cloud/AWS/aws",title:"AWS",description:"Config",source:"@site/docs/Cloud/AWS/aws.md",sourceDirName:"Cloud/AWS",slug:"/Cloud/AWS/",permalink:"/kb/Cloud/AWS/",draft:!1,unlisted:!1,editUrl:"https://github.com/engilyin/kb/docs/Cloud/AWS/aws.md",tags:[],version:"current",lastUpdatedAt:1727544268e3,frontMatter:{},sidebar:"defaultSidebar",previous:{title:"Alex Ilin Knowledge Base",permalink:"/kb/"},next:{title:"Elastic Container Service",permalink:"/kb/Cloud/AWS/esc"}},r={},l=[{value:"Config",id:"config",level:2},{value:"IAM",id:"iam",level:2},{value:"attach",id:"attach",level:2},{value:"S3",id:"s3",level:2},{value:"S3 permissions",id:"s3-permissions",level:3},{value:"Add server-side encryption to the bucket",id:"add-server-side-encryption-to-the-bucket",level:2},{value:"Copy files between the buckets",id:"copy-files-between-the-buckets",level:2},{value:"Assuming the policy",id:"assuming-the-policy",level:2},{value:"Create inline policy",id:"create-inline-policy",level:3},{value:"Update tryst policy",id:"update-tryst-policy",level:3},{value:"Create S3 bucket notification",id:"create-s3-bucket-notification",level:2},{value:"Setup Gateway API to triger lambda function",id:"setup-gateway-api-to-triger-lambda-function",level:2},{value:"CloudFront",id:"cloudfront",level:2},{value:"S3 access",id:"s3-access",level:2},{value:"Adding permission to lambda",id:"adding-permission-to-lambda",level:2},{value:"Update lambda",id:"update-lambda",level:2}];function d(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"aws",children:"AWS"})}),"\n",(0,t.jsx)(n.h2,{id:"config",children:"Config"}),"\n",(0,t.jsxs)(n.p,{children:["turn off vi mode for ",(0,t.jsx)(n.code,{children:"aws"})," output"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'aws configure set cli_pager ""\n'})}),"\n",(0,t.jsx)(n.h2,{id:"iam",children:"IAM"}),"\n",(0,t.jsx)(n.p,{children:"List permissions attached to the role"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"aws iam list-attached-role-policies --role-name  cmtr-2139af1e-iam-peld-iam_role\naws iam list-role-policies --role-name cmtr-2139af1e-iam-peld-iam_role \n"})}),"\n",(0,t.jsx)(n.h2,{id:"attach",children:"attach"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"aws iam list-attached-role-policies --role-name cmtr-2139af1e-iam-peld-iam_role\n"})}),"\n",(0,t.jsx)(n.h2,{id:"s3",children:"S3"}),"\n",(0,t.jsx)(n.h3,{id:"s3-permissions",children:"S3 permissions"}),"\n",(0,t.jsx)(n.p,{children:"Check the current policy"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"aws s3api get-bucket-policy --bucket cmtr-2139af1e-iam-peld-bucket-8383461\n\naws s3api get-bucket-policy --bucket cmtr-2139af1e-iam-peld-bucket-8383461 --query 'Policy' --output text | jq .\n\n"})}),"\n",(0,t.jsx)(n.p,{children:"Change the policy:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'aws s3api put-bucket-policy --bucket cmtr-2139af1e-iam-peld-bucket-8383461 --policy \'{\n    "Version": "2012-10-17",\n    "Statement": [\n        {\n            "Sid": "DenyDeleteObjects",\n            "Effect": "Deny",\n            "Principal": {\n                "AWS": "arn:aws:iam::905418349556:role/cmtr-2139af1e-iam-peld-iam_role"\n            },\n            "Action": "s3:DeleteObject",\n            "Resource": "arn:aws:s3:::cmtr-2139af1e-iam-peld-bucket-8383461/*"\n        }\n    ]\n}\'\n'})}),"\n",(0,t.jsx)(n.p,{children:"Create a new policy to list bucket objects:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'aws iam create-policy \\\n    --policy-name cmtr-2139af1e-AllowListAllBucketsPolicy \\\n    --policy-document \'{\n        "Version": "2012-10-17",\n        "Statement": [\n            {\n                "Sid": "AllowListAllBuckets",\n                "Effect": "Allow",\n                "Action": "s3:ListAllMyBuckets",\n                "Resource": "*"\n            }\n        ]\n    }\'\n'})}),"\n",(0,t.jsx)(n.p,{children:"attach policy to the bucket"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"aws iam attach-role-policy \\\n    --role-name cmtr-2139af1e-iam-pela-iam_role \\\n    --policy-arn arn:aws:iam::905418349556:policy/cmtr-2139af1e-AllowListAllBucketsPolicy\n    \n# for chaining this role to assume and grant tmp access    \naws iam attach-role-policy \\\n    --role-name cmtr-2139af1e-iam-ar-iam_role-readonly \\\n    --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess\n\n"})}),"\n",(0,t.jsx)(n.p,{children:"Create a resource-based S3 bucket policy that allows to get and put an object as well as list objects of the cmtr-2139af1e-iam-pela-bucket-1-1933452 bucket. The cmtr-2139af1e-iam-pela-iam_role role must be allowed to perform all these actions only for the cmtr-2139af1e-iam-pela-bucket-1-1933452 bucket, and do not allow access to all principals."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'aws s3api put-bucket-policy --bucket cmtr-2139af1e-iam-pela-bucket-1-1933452 --policy \'{\n    "Version": "2012-10-17",\n    "Statement": [\n        {\n            "Sid": "AllowSpecificRoleS3Actions",\n            "Effect": "Allow",\n            "Principal": {\n                "AWS": "arn:aws:iam::905418349556:role/cmtr-2139af1e-iam-pela-iam_role"\n            },\n            "Action": [\n                "s3:GetObject",\n                "s3:PutObject",\n                "s3:ListBucket"\n            ],\n            "Resource": [\n                "arn:aws:s3:::cmtr-2139af1e-iam-pela-bucket-1-1933452",\n                "arn:aws:s3:::cmtr-2139af1e-iam-pela-bucket-1-1933452/*"\n            ]\n        }\n    ]\n}\'\n'})}),"\n",(0,t.jsx)(n.h2,{id:"add-server-side-encryption-to-the-bucket",children:"Add server-side encryption to the bucket"}),"\n",(0,t.jsx)(n.p,{children:"KMS managed keys"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'aws s3api put-bucket-encryption \\\n    --bucket cmtr-2139af1e-iam-sewk-bucket-3305325-2 \\\n    --server-side-encryption-configuration \'{\n        "Rules": [\n            {\n                "ApplyServerSideEncryptionByDefault": {\n                    "SSEAlgorithm": "aws:kms",\n                    "KMSMasterKeyID": "arn:aws:kms:eu-central-1:905418349556:key/4bf1ec1d-c8b9-48d8-ab86-e6b994eb4ca4"\n                },\n                "BucketKeyEnabled": false\n            }\n        ]\n    }\'\n'})}),"\n",(0,t.jsx)(n.p,{children:"Checking"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"aws s3api get-bucket-encryption --bucket cmtr-2139af1e-iam-sewk-bucket-3305325-2\n\n"})}),"\n",(0,t.jsx)(n.h2,{id:"copy-files-between-the-buckets",children:"Copy files between the buckets"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"aws s3 cp s3://cmtr-2139af1e-iam-sewk-bucket-3305325-1/confidential_credentials.csv s3://cmtr-2139af1e-iam-sewk-bucket-3305325-2/\n\n"})}),"\n",(0,t.jsx)(n.h2,{id:"assuming-the-policy",children:"Assuming the policy"}),"\n",(0,t.jsx)(n.h3,{id:"create-inline-policy",children:"Create inline policy"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'aws iam put-role-policy \\\n    --role-name cmtr-2139af1e-iam-ar-iam_role-assume \\\n    --policy-name AllowAssumeRolePolicy \\\n    --policy-document \'{\n        "Version": "2012-10-17",\n        "Statement": [\n            {\n                "Effect": "Allow",\n                "Action": "sts:AssumeRole",\n                "Resource": "*"\n            }\n        ]\n    }\'\n'})}),"\n",(0,t.jsx)(n.p,{children:"Verify inline policy for the role:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"aws iam get-role-policy \\\n    --role-name cmtr-2139af1e-iam-ar-iam_role-assume \\\n    --policy-name AllowAssumeRolePolicy\n"})}),"\n",(0,t.jsx)(n.h3,{id:"update-tryst-policy",children:"Update tryst policy"}),"\n",(0,t.jsxs)(n.p,{children:["So this tole could be assumed by ones with ",(0,t.jsx)(n.code,{children:"role-assume"})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'aws iam update-assume-role-policy \\\n    --role-name cmtr-2139af1e-iam-ar-iam_role-readonly \\\n    --policy-document \'{\n        "Version": "2012-10-17",\n        "Statement": [\n            {\n                "Effect": "Allow",\n                "Principal": {\n                    "AWS": "arn:aws:iam::905418349556:role/cmtr-2139af1e-iam-ar-iam_role-assume"\n                },\n                "Action": "sts:AssumeRole"\n            }\n        ]\n    }\'\n'})}),"\n",(0,t.jsx)(n.p,{children:"You can cehck it:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"aws iam get-role --role-name cmtr-2139af1e-iam-ar-iam_role-readonly --query 'Role.AssumeRolePolicyDocument'\n"})}),"\n",(0,t.jsx)(n.h2,{id:"create-s3-bucket-notification",children:"Create S3 bucket notification"}),"\n",(0,t.jsxs)(n.p,{children:["to send event on creation the object on ",(0,t.jsx)(n.code,{children:"/input"})," folder:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'aws s3api put-bucket-notification-configuration --bucket cmtr-2139af1e-s3-snlt-bucket-257883 --notification-configuration \'{\n  "QueueConfigurations": [\n    {\n      "Id": "InputUploadNotification",\n      "QueueArn": "arn:aws:sqs:eu-central-1:905418349556:cmtr-2139af1e-s3-snlt-queue",\n      "Events": ["s3:ObjectCreated:*"],\n      "Filter": {\n        "Key": {\n          "FilterRules": [\n            {\n              "Name": "prefix",\n              "Value": "input/"\n            }\n          ]\n        }\n      }\n    }\n  ]\n}\'\n'})}),"\n",(0,t.jsx)(n.p,{children:"to trigger lambda function on SQS message:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"aws lambda create-event-source-mapping --function-name cmtr-2139af1e-s3-snlt-lambda --batch-size 10 --event-source-arn arn:aws:sqs:eu-central-1:905418349556:cmtr-2139af1e-s3-snlt-queue\n\n"})}),"\n",(0,t.jsx)(n.p,{children:"to check:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"aws lambda list-event-source-mappings --function-name cmtr-2139af1e-s3-snlt-lambda\n"})}),"\n",(0,t.jsx)(n.h2,{id:"setup-gateway-api-to-triger-lambda-function",children:"Setup Gateway API to triger lambda function"}),"\n",(0,t.jsx)(n.p,{children:"Get APIs and find the available pathes:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"aws apigatewayv2 get-apis\naws apigatewayv2 get-routes --api-id 2sfavl241a\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Get ",(0,t.jsx)(n.code,{children:"route-id"})," from ",(0,t.jsx)(n.code,{children:"get-routes"})," and change the path:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'aws apigatewayv2 update-route \\\n    --api-id uojkedagy7 \\\n    --route-id dir41c6 \\\n    --route-key "GET /contacts"\n'})}),"\n",(0,t.jsx)(n.p,{children:"Adding Exec permission on  lambda to allow it to call by API:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'aws lambda add-permission \\\n --statement-id 30dc5cdd-6ba7-5514-8507-12adfeb7f2ef \\\n --action lambda:InvokeFunction \\\n --function-name "arn:aws:lambda:eu-central-1:905418349556:function:cmtr-2139af1e-api-gwlp-lambda-contacts" \\\n --principal apigateway.amazonaws.com \\\n --source-arn "arn:aws:execute-api:eu-central-1:905418349556:uojkedagy7/*/*/contacts"\n'})}),"\n",(0,t.jsx)(n.p,{children:"Create route:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'aws apigatewayv2 create-route \\\n   --api-id <API_ID> \\\n   --route-key "POST /products"\n   \n   aws apigatewayv2 create-route --api-id 2sfavl241a --route-key "POST /products"\n'})}),"\n",(0,t.jsx)(n.p,{children:"attach"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'aws apigatewayv2 create-integration \\\n   --api-id <API_ID> \\\n   --integration-type AWS_PROXY \\\n   --integration-uri arn:aws:lambda:eu-central-1:905418349556:function:cmtr-2139af1e-dynamodb-l-lambda-createProduct \\\n   --integration-method POST \\\n   --payload-format-version 2.0\n\n   \naws apigatewayv2 create-integration \\\n   --api-id 2sfavl241a \\\n   --integration-type AWS_PROXY \\\n   --integration-uri arn:aws:lambda:eu-central-1:905418349556:function:cmtr-2139af1e-dynamodb-l-lambda-getProductsList \\\n   --integration-method GET \\\n   --payload-format-version 2.0\n   \n#attach integration\n\naws apigatewayv2 update-route \\\n   --api-id <API_ID> \\\n   --route-id <ROUTE_ID> \\\n   --target integrations/<INTEGRATION_ID>\n   \naws apigatewayv2 update-route \\\n   --api-id 2sfavl241a \\\n   --route-id 57a71s0 \\\n   --target integrations/dr7dois\n   \naws apigatewayv2 update-route \\\n   --api-id 2sfavl241a \\\n   --route-id j70xmb2 \\\n   --target integrations/taajtpu\n   \n   \n   \n# Exec perms\n\naws lambda add-permission \\\n--statement-id 4ff933ce-028b-5a06-8134-61c79a365d90 \\\n--action lambda:InvokeFunction \\\n--function-name "arn:aws:lambda:eu-central-1:905418349556:function:cmtr-2139af1e-dynamodb-l-lambda-getProductsList" \\\n--principal apigateway.amazonaws.com \\\n--source-arn "arn:aws:execute-api:eu-central-1:905418349556:2sfavl241a/*/*/products"\n\n\naws lambda add-permission \\\n--statement-id 0372ba6b-b497-5600-a63a-dfaefddbc326 \\\n--action lambda:InvokeFunction \\\n--function-name "arn:aws:lambda:eu-central-1:905418349556:function:cmtr-2139af1e-dynamodb-l-lambda-createProduct" \\\n--principal apigateway.amazonaws.com \\\n--source-arn "arn:aws:execute-api:eu-central-1:905418349556:2sfavl241a/*/*/products"\n\n\n\n# Create deployment\n\naws apigatewayv2 create-deployment \\\n   --api-id <API_ID> \\\n   --description "Initial deployment"\n   \naws apigatewayv2 create-deployment \\\n   --api-id 2sfavl241a \\\n   --description "Initial deployment"\n'})}),"\n",(0,t.jsx)(n.h2,{id:"cloudfront",children:"CloudFront"}),"\n",(0,t.jsx)(n.p,{children:"List distribution and info"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"aws cloudfront list-distributions --query \"DistributionList.Items[?Comment=='cmtr-2139af1e-cloudfront-sswo-distribution'].Id\" --output text\naws cloudfront get-distribution-config --id <distribution-id>\naws cloudfront get-distribution-config --id ECDTCRA9L5JEH\n"})}),"\n",(0,t.jsx)(n.p,{children:'getting the "ETag": "E8UI0AIP3GNN5"'}),"\n",(0,t.jsxs)(n.p,{children:["Finding the origin by ",(0,t.jsx)(n.code,{children:"ECDTCRA9L5JEH"})," distribution-id:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'aws cloudfront get-distribution-config --id <distribution-id> --query "DistributionConfig.Origins.Items"\naws cloudfront get-distribution-config --id ECDTCRA9L5JEH --query "DistributionConfig.Origins.Items"\n'})}),"\n",(0,t.jsx)(n.p,{children:"cmtr-2139af1e-cloudfront-sswo-origin"}),"\n",(0,t.jsx)(n.p,{children:"Update OAE:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'# Get current policy\naws cloudfront get-distribution-config --id ECDTCRA9L5JEH --query DistributionConfig --output json > current-distribution-config.json\n\n# list OAE\naws cloudfront list-cloud-front-origin-access-identities --query "CloudFrontOriginAccessIdentityList.Items[*].{ID:Id,Comment:Comment}"\n# Find our OAE is `E3472UWV76MDES`\n\naws cloudfront get-distribution-config --id <distribution-id> --query "DistributionConfig.Origins.Items"\naws cloudfront get-distribution-config --id ECDTCRA9L5JEH --query "DistributionConfig.Origins.Items"\n\naws cloudfront update-distribution --id <distribution-id> --distribution-config file://distribution-config.json --if-match <ETag>\n\naws cloudfront update-distribution --id ECDTCRA9L5JEH --distribution-config file://current-distribution-config.json --if-match E8UI0AIP3GNN5\n'})}),"\n",(0,t.jsx)(n.p,{children:"You need the file distribution-config.json"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",children:'{\n  "Origins": {\n    "Items": [\n      {\n        "Id": "<origin-id>",\n        "DomainName": "cmtr-2139af1e-cloudfront-sswo-bucket-9680602.s3.amazonaws.com",\n        "S3OriginConfig": {\n          "OriginAccessIdentity": "origin-access-identity/cloudfront/<OAI-id>"\n        }\n      }\n    ]\n  }\n}\n'})}),"\n",(0,t.jsx)(n.p,{children:"Also you need to add setup for error page:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'{\n  "CustomErrorResponses": {\n    "Quantity": 1,\n    "Items": [\n      {\n        "ErrorCode": 403,\n        "ResponsePagePath": "/error.html",\n        "ResponseCode": "404",\n        "ErrorCachingMinTTL": 300\n      }\n    ]\n  }\n}\n'})}),"\n",(0,t.jsx)(n.p,{children:"but for the second update call you need the new ETag:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"aws cloudfront get-distribution-config --id ENMG9CWYCLGPS --query '{ETag:ETag,Config:DistributionConfig}' --output json\n"})}),"\n",(0,t.jsx)(n.h2,{id:"s3-access",children:"S3 access"}),"\n",(0,t.jsx)(n.p,{children:"Block public access:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'aws s3api put-public-access-block --bucket cmtr-2139af1e-cloudfront-sswo-bucket-1242585 --public-access-block-configuration \'{\n  "BlockPublicAcls": true,\n  "IgnorePublicAcls": true,\n  "BlockPublicPolicy": true,\n  "RestrictPublicBuckets": true\n}\'\n'})}),"\n",(0,t.jsx)(n.p,{children:"Verify:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"aws s3api get-public-access-block --bucket cmtr-2139af1e-cloudfront-sswo-bucket-1242585\n\n"})}),"\n",(0,t.jsx)(n.p,{children:"We also need to setup OAE bucket policies to access bucket:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'aws s3api get-bucket-policy --bucket cmtr-2139af1e-cloudfront-sswo-bucket-1242585\n\n# if there is no policy - create one:\n\naws s3api put-bucket-policy --bucket cmtr-2139af1e-cloudfront-sswo-bucket-1242585 --policy \'{\n    "Version": "2012-10-17",\n    "Statement": [\n        {\n            "Effect": "Allow",\n            "Principal": {\n                "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity OAI-CANONICAL-ID"\n            },\n            "Action": "s3:GetObject",\n            "Resource": "arn:aws:s3:::cmtr-2139af1e-cloudfront-sswo-bucket-1242585/*"\n        }\n    ]\n}\'\n\n#You do not need Canonical Id for OAI:\n\naws cloudfront list-cloud-front-origin-access-identities --query "CloudFrontOriginAccessIdentityList.Items[*].{ID:Id,S3CanonicalUserId:S3CanonicalUserId}"\n\n\n#Just use OAI ID\n\naws s3api put-bucket-policy --bucket cmtr-2139af1e-cloudfront-sswo-bucket-1242585 --policy \'{\n    "Version": "2012-10-17",\n    "Statement": [\n        {\n            "Effect": "Allow",\n            "Principal": {\n                "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E3472UWV76MDES"\n            },\n            "Action": "s3:GetObject",\n            "Resource": "arn:aws:s3:::cmtr-2139af1e-cloudfront-sswo-bucket-1242585/*"\n        }\n    ]\n}\'\n\n'})}),"\n",(0,t.jsx)(n.h2,{id:"adding-permission-to-lambda",children:"Adding permission to lambda"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"aws lambda get-function \\\n    --function-name cmtr-2139af1e-dynamodb-l-lambda-getProductsList \\\n    --query 'Configuration.Role'\n\n#arn:aws:iam::905418349556:role/cmtr-2139af1e-dynamodb-l-lambda-getProductsList  \n    \naws iam attach-role-policy \\\n    --role-name cmtr-2139af1e-dynamodb-l-lambda-getProductsList \\\n    --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBReadOnlyAccess\n \n \naws iam attach-role-policy \\\n    --role-name cmtr-2139af1e-dynamodb-l-lambda-createProduct \\\n    --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess\n        \n    \n"})}),"\n",(0,t.jsx)(n.h2,{id:"update-lambda",children:"Update lambda"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"aws lambda update-function-code --function-name cmtr-2139af1e-dynamodb-l-lambda-createProduct --zip-file fileb://create_product.zip\naws lambda update-function-code --function-name cmtr-2139af1e-dynamodb-l-lambda-getProductsList --zip-file fileb://get_product_list.zip\n\n\n"})})]})}function u(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>s});var t=i(6540);const a={},c=t.createContext(a);function o(e){const n=t.useContext(c);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),t.createElement(c.Provider,{value:n},e.children)}}}]);