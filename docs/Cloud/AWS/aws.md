# AWS

## Config

turn off vi mode for `aws` output

```
aws configure set cli_pager ""
```

## IAM
List permissions attached to the role

```
aws iam list-attached-role-policies --role-name  cmtr-2139af1e-iam-peld-iam_role
aws iam list-role-policies --role-name cmtr-2139af1e-iam-peld-iam_role 
```


## attach
```
aws iam list-attached-role-policies --role-name cmtr-2139af1e-iam-peld-iam_role
```



## S3

### S3 permissions

Check the current policy

```
aws s3api get-bucket-policy --bucket cmtr-2139af1e-iam-peld-bucket-8383461

aws s3api get-bucket-policy --bucket cmtr-2139af1e-iam-peld-bucket-8383461 --query 'Policy' --output text | jq .

```

Change the policy:

```
aws s3api put-bucket-policy --bucket cmtr-2139af1e-iam-peld-bucket-8383461 --policy '{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "DenyDeleteObjects",
            "Effect": "Deny",
            "Principal": {
                "AWS": "arn:aws:iam::905418349556:role/cmtr-2139af1e-iam-peld-iam_role"
            },
            "Action": "s3:DeleteObject",
            "Resource": "arn:aws:s3:::cmtr-2139af1e-iam-peld-bucket-8383461/*"
        }
    ]
}'
```

Create a new policy to list bucket objects:

```
aws iam create-policy \
    --policy-name cmtr-2139af1e-AllowListAllBucketsPolicy \
    --policy-document '{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "AllowListAllBuckets",
                "Effect": "Allow",
                "Action": "s3:ListAllMyBuckets",
                "Resource": "*"
            }
        ]
    }'
```


attach policy to the bucket

```
aws iam attach-role-policy \
    --role-name cmtr-2139af1e-iam-pela-iam_role \
    --policy-arn arn:aws:iam::905418349556:policy/cmtr-2139af1e-AllowListAllBucketsPolicy
    
# for chaining this role to assume and grant tmp access    
aws iam attach-role-policy \
    --role-name cmtr-2139af1e-iam-ar-iam_role-readonly \
    --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess

```


Create a resource-based S3 bucket policy that allows to get and put an object as well as list objects of the cmtr-2139af1e-iam-pela-bucket-1-1933452 bucket. The cmtr-2139af1e-iam-pela-iam_role role must be allowed to perform all these actions only for the cmtr-2139af1e-iam-pela-bucket-1-1933452 bucket, and do not allow access to all principals.
```
aws s3api put-bucket-policy --bucket cmtr-2139af1e-iam-pela-bucket-1-1933452 --policy '{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowSpecificRoleS3Actions",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::905418349556:role/cmtr-2139af1e-iam-pela-iam_role"
            },
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::cmtr-2139af1e-iam-pela-bucket-1-1933452",
                "arn:aws:s3:::cmtr-2139af1e-iam-pela-bucket-1-1933452/*"
            ]
        }
    ]
}'
```

## Add server-side encryption to the bucket

KMS managed keys

```
aws s3api put-bucket-encryption \
    --bucket cmtr-2139af1e-iam-sewk-bucket-3305325-2 \
    --server-side-encryption-configuration '{
        "Rules": [
            {
                "ApplyServerSideEncryptionByDefault": {
                    "SSEAlgorithm": "aws:kms",
                    "KMSMasterKeyID": "arn:aws:kms:eu-central-1:905418349556:key/4bf1ec1d-c8b9-48d8-ab86-e6b994eb4ca4"
                },
                "BucketKeyEnabled": false
            }
        ]
    }'
```

Checking
```
aws s3api get-bucket-encryption --bucket cmtr-2139af1e-iam-sewk-bucket-3305325-2

```

## Copy files between the buckets

```
aws s3 cp s3://cmtr-2139af1e-iam-sewk-bucket-3305325-1/confidential_credentials.csv s3://cmtr-2139af1e-iam-sewk-bucket-3305325-2/

```


## Assuming the policy

### Create inline policy

```
aws iam put-role-policy \
    --role-name cmtr-2139af1e-iam-ar-iam_role-assume \
    --policy-name AllowAssumeRolePolicy \
    --policy-document '{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": "sts:AssumeRole",
                "Resource": "*"
            }
        ]
    }'
```


Verify inline policy for the role:
```
aws iam get-role-policy \
    --role-name cmtr-2139af1e-iam-ar-iam_role-assume \
    --policy-name AllowAssumeRolePolicy
```


### Update tryst policy

So this tole could be assumed by ones with `role-assume`

```
aws iam update-assume-role-policy \
    --role-name cmtr-2139af1e-iam-ar-iam_role-readonly \
    --policy-document '{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {
                    "AWS": "arn:aws:iam::905418349556:role/cmtr-2139af1e-iam-ar-iam_role-assume"
                },
                "Action": "sts:AssumeRole"
            }
        ]
    }'
```

You can cehck it:
```
aws iam get-role --role-name cmtr-2139af1e-iam-ar-iam_role-readonly --query 'Role.AssumeRolePolicyDocument'
```


## Create S3 bucket notification

to send event on creation the object on `/input` folder:

```
aws s3api put-bucket-notification-configuration --bucket cmtr-2139af1e-s3-snlt-bucket-257883 --notification-configuration '{
  "QueueConfigurations": [
    {
      "Id": "InputUploadNotification",
      "QueueArn": "arn:aws:sqs:eu-central-1:905418349556:cmtr-2139af1e-s3-snlt-queue",
      "Events": ["s3:ObjectCreated:*"],
      "Filter": {
        "Key": {
          "FilterRules": [
            {
              "Name": "prefix",
              "Value": "input/"
            }
          ]
        }
      }
    }
  ]
}'
```
  
to trigger lambda function on SQS message:

```
aws lambda create-event-source-mapping --function-name cmtr-2139af1e-s3-snlt-lambda --batch-size 10 --event-source-arn arn:aws:sqs:eu-central-1:905418349556:cmtr-2139af1e-s3-snlt-queue

```

to check:
```
aws lambda list-event-source-mappings --function-name cmtr-2139af1e-s3-snlt-lambda
```
  
  
## Setup Gateway API to triger lambda function

Get APIs and find the available pathes:
```
aws apigatewayv2 get-apis
aws apigatewayv2 get-routes --api-id 2sfavl241a
```

Get `route-id` from `get-routes` and change the path:
```
aws apigatewayv2 update-route \
    --api-id uojkedagy7 \
    --route-id dir41c6 \
    --route-key "GET /contacts"
```


Adding Exec permission on  lambda to allow it to call by API:
```
aws lambda add-permission \
 --statement-id 30dc5cdd-6ba7-5514-8507-12adfeb7f2ef \
 --action lambda:InvokeFunction \
 --function-name "arn:aws:lambda:eu-central-1:905418349556:function:cmtr-2139af1e-api-gwlp-lambda-contacts" \
 --principal apigateway.amazonaws.com \
 --source-arn "arn:aws:execute-api:eu-central-1:905418349556:uojkedagy7/*/*/contacts"
 ```
 
 Create route:
 
 ```
 aws apigatewayv2 create-route \
    --api-id <API_ID> \
    --route-key "POST /products"
    
    aws apigatewayv2 create-route --api-id 2sfavl241a --route-key "POST /products"
 ```
  
 
 attach
 
 ```
 aws apigatewayv2 create-integration \
    --api-id <API_ID> \
    --integration-type AWS_PROXY \
    --integration-uri arn:aws:lambda:eu-central-1:905418349556:function:cmtr-2139af1e-dynamodb-l-lambda-createProduct \
    --integration-method POST \
    --payload-format-version 2.0

    
aws apigatewayv2 create-integration \
    --api-id 2sfavl241a \
    --integration-type AWS_PROXY \
    --integration-uri arn:aws:lambda:eu-central-1:905418349556:function:cmtr-2139af1e-dynamodb-l-lambda-getProductsList \
    --integration-method GET \
    --payload-format-version 2.0
    
#attach integration

aws apigatewayv2 update-route \
    --api-id <API_ID> \
    --route-id <ROUTE_ID> \
    --target integrations/<INTEGRATION_ID>
    
aws apigatewayv2 update-route \
    --api-id 2sfavl241a \
    --route-id 57a71s0 \
    --target integrations/dr7dois
    
aws apigatewayv2 update-route \
    --api-id 2sfavl241a \
    --route-id j70xmb2 \
    --target integrations/taajtpu
    
    
    
# Exec perms

aws lambda add-permission \
 --statement-id 4ff933ce-028b-5a06-8134-61c79a365d90 \
 --action lambda:InvokeFunction \
 --function-name "arn:aws:lambda:eu-central-1:905418349556:function:cmtr-2139af1e-dynamodb-l-lambda-getProductsList" \
 --principal apigateway.amazonaws.com \
 --source-arn "arn:aws:execute-api:eu-central-1:905418349556:2sfavl241a/*/*/products"
 
 
 aws lambda add-permission \
 --statement-id 0372ba6b-b497-5600-a63a-dfaefddbc326 \
 --action lambda:InvokeFunction \
 --function-name "arn:aws:lambda:eu-central-1:905418349556:function:cmtr-2139af1e-dynamodb-l-lambda-createProduct" \
 --principal apigateway.amazonaws.com \
 --source-arn "arn:aws:execute-api:eu-central-1:905418349556:2sfavl241a/*/*/products"
 
 
 
 # Create deployment
 
 aws apigatewayv2 create-deployment \
    --api-id <API_ID> \
    --description "Initial deployment"
    
 aws apigatewayv2 create-deployment \
    --api-id 2sfavl241a \
    --description "Initial deployment"
```
 
 
 ## CloudFront
 
 List distribution and info
 
 ```
 aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='cmtr-2139af1e-cloudfront-sswo-distribution'].Id" --output text
 aws cloudfront get-distribution-config --id <distribution-id>
 aws cloudfront get-distribution-config --id ECDTCRA9L5JEH
 ```
 
 
 getting the "ETag": "E8UI0AIP3GNN5"
 
 Finding the origin by `ECDTCRA9L5JEH` distribution-id:
 ```
 aws cloudfront get-distribution-config --id <distribution-id> --query "DistributionConfig.Origins.Items"
 aws cloudfront get-distribution-config --id ECDTCRA9L5JEH --query "DistributionConfig.Origins.Items"
```

cmtr-2139af1e-cloudfront-sswo-origin


Update OAE:
```
# Get current policy
aws cloudfront get-distribution-config --id ECDTCRA9L5JEH --query DistributionConfig --output json > current-distribution-config.json

# list OAE
aws cloudfront list-cloud-front-origin-access-identities --query "CloudFrontOriginAccessIdentityList.Items[*].{ID:Id,Comment:Comment}"
# Find our OAE is `E3472UWV76MDES`

aws cloudfront get-distribution-config --id <distribution-id> --query "DistributionConfig.Origins.Items"
aws cloudfront get-distribution-config --id ECDTCRA9L5JEH --query "DistributionConfig.Origins.Items"

aws cloudfront update-distribution --id <distribution-id> --distribution-config file://distribution-config.json --if-match <ETag>

aws cloudfront update-distribution --id ECDTCRA9L5JEH --distribution-config file://current-distribution-config.json --if-match E8UI0AIP3GNN5
```

You need the file distribution-config.json

```json
{
  "Origins": {
    "Items": [
      {
        "Id": "<origin-id>",
        "DomainName": "cmtr-2139af1e-cloudfront-sswo-bucket-9680602.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": "origin-access-identity/cloudfront/<OAI-id>"
        }
      }
    ]
  }
}
```

Also you need to add setup for error page:

```
{
  "CustomErrorResponses": {
    "Quantity": 1,
    "Items": [
      {
        "ErrorCode": 403,
        "ResponsePagePath": "/error.html",
        "ResponseCode": "404",
        "ErrorCachingMinTTL": 300
      }
    ]
  }
}
```

but for the second update call you need the new ETag:
```
aws cloudfront get-distribution-config --id ENMG9CWYCLGPS --query '{ETag:ETag,Config:DistributionConfig}' --output json
```

## S3 access

Block public access:

```
aws s3api put-public-access-block --bucket cmtr-2139af1e-cloudfront-sswo-bucket-1242585 --public-access-block-configuration '{
  "BlockPublicAcls": true,
  "IgnorePublicAcls": true,
  "BlockPublicPolicy": true,
  "RestrictPublicBuckets": true
}'
```

Verify:
```
aws s3api get-public-access-block --bucket cmtr-2139af1e-cloudfront-sswo-bucket-1242585

```

We also need to setup OAE bucket policies to access bucket:

```
aws s3api get-bucket-policy --bucket cmtr-2139af1e-cloudfront-sswo-bucket-1242585

# if there is no policy - create one:

aws s3api put-bucket-policy --bucket cmtr-2139af1e-cloudfront-sswo-bucket-1242585 --policy '{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity OAI-CANONICAL-ID"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::cmtr-2139af1e-cloudfront-sswo-bucket-1242585/*"
        }
    ]
}'

#You do not need Canonical Id for OAI:

aws cloudfront list-cloud-front-origin-access-identities --query "CloudFrontOriginAccessIdentityList.Items[*].{ID:Id,S3CanonicalUserId:S3CanonicalUserId}"


#Just use OAI ID

aws s3api put-bucket-policy --bucket cmtr-2139af1e-cloudfront-sswo-bucket-1242585 --policy '{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E3472UWV76MDES"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::cmtr-2139af1e-cloudfront-sswo-bucket-1242585/*"
        }
    ]
}'

```


## Adding permission to lambda

```
aws lambda get-function \
    --function-name cmtr-2139af1e-dynamodb-l-lambda-getProductsList \
    --query 'Configuration.Role'

#arn:aws:iam::905418349556:role/cmtr-2139af1e-dynamodb-l-lambda-getProductsList  
    
aws iam attach-role-policy \
    --role-name cmtr-2139af1e-dynamodb-l-lambda-getProductsList \
    --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBReadOnlyAccess
 
 
aws iam attach-role-policy \
    --role-name cmtr-2139af1e-dynamodb-l-lambda-createProduct \
    --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess
        
    
```

## Update lambda

```
aws lambda update-function-code --function-name cmtr-2139af1e-dynamodb-l-lambda-createProduct --zip-file fileb://create_product.zip
aws lambda update-function-code --function-name cmtr-2139af1e-dynamodb-l-lambda-getProductsList --zip-file fileb://get_product_list.zip


```
