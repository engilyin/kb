# AWS DB Migration Service

## Creating the collector

### Create the S3 bucket

Just regular bucket in the same region where the DB is running.

Let's call it `jumpbox-to-rds-db-migration`

### Creating the Role

Create the custom policy to use for this Role:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject*",
                "s3:GetBucket*",
                "s3:List*",
                "s3:DeleteObject*",
                "s3:PutObject*"
            ],
            "Resource": [
                "arn:aws:s3:::jumpbox-to-rds-db-migration",
                "arn:aws:s3:::jumpbox-to-rds-db-migration/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "dms:DescribeFleetAdvisorCollectors",
                "dms:ModifyFleetAdvisorCollectorStatuses",
                "dms:UploadFileMetadataList"
            ],
            "Resource": "*"
        }
    ]
}
```

Also later you can reuse this role to access the secret manager to retrieve the secrets for accessing the DB.
So create such policy `AccessSecretManager`

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowDMSSecretsManagerWithKMSRole",
      "Effect": "Allow",
      "Action": [
        "secretsmanager:DescribeSecret",
        "secretsmanager:GetSecretValue"
      ],
      "Resource": [
        "arn:aws:secretsmanager:us-east-1:<ACCOUNT-ID>:secret:*"
      ]
    },
    {
      "Sid": "KMS",
      "Effect": "Allow",
      "Action": [
        "kms:Encrypt",
        "kms:ReEncryptFrom",
        "kms:ReEncryptTo",
        "kms:Decrypt"
      ],
      "Resource": [
        "arn:aws:kms:us-east-1:<ACCOUNT-ID>:key/*"
      ],
      "Condition": {
        "StringEquals": {
          "kms:CallerAccount": "<ACCOUNT-ID>",
          "kms:ViaService": [
            "secretsmanager.us-east-1.amazonaws.com"
          ],
          "kms:EncryptionContext:SecretARN": [
            "arn:aws:secretsmanager:us-east-1:<ACCOUNT-ID>:secret:*"
          ]
        }
      }
    },
    {
      "Sid": "KMSDescribeKey",
      "Effect": "Allow",
      "Action": [
        "kms:DescribeKey"
      ],
      "Resource": [
        "arn:aws:kms:us-east-1:<ACCOUNT-ID>:key/*"
      ],
      "Condition": {
        "StringEquals": {
          "kms:CallerAccount": "<ACCOUNT-ID>",
          "kms:ViaService": "secretsmanager.us-east-1.amazonaws.com"
        }
      }
    },
    {
      "Sid": "KMSListAliases",
      "Effect": "Allow",
      "Action": [
        "kms:ListAliases"
      ],
      "Resource": "*"
    }
  ]
}
```

Trust policy should be

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "dms.amazonaws.com",
          "dms-fleet-advisor.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```


### Creating the Linked Role

Just add the role `AWSServiceRoleForDMSFleetAdvisor ` with managed policy `AWSDMSFleetAdvisorServiceRolePolicy`


### Creating the collector

Just name it add the S3 and role and it should be able to provision the collector



## Creating Instance Profile

### Instance Profile

### Security group

You need `dms-vpc-role` role with:

Trust Relationship:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AWSDMSVPCPolicyTemplate",
      "Effect": "Allow",
      "Principal": {
        "Service": "dms.amazonaws.com"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "aws:SourceAccount": "225774417763"
        }
      }
    }
  ]
}
```

And Permission Policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CreateNetworkInterface",
      "Effect": "Allow",
      "Action": [
        "ec2:CreateNetworkInterface",
        "ec2:DeleteNetworkInterface",
        "ec2:ModifyNetworkInterfaceAttribute"
      ],
      "Resource": [
        "arn:aws:ec2:*:225774417763:network-interface/*",
        "arn:aws:ec2:*:225774417763:instance/*",
        "arn:aws:ec2:*:225774417763:subnet/*",
        "arn:aws:ec2:*:225774417763:security-group/*"
      ]
    },
    {
      "Sid": "DescribeVPC",
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeAvailabilityZones",
        "ec2:DescribeInternetGateways",
        "ec2:DescribeSubnets",
        "ec2:DescribeVpcs",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeDhcpOptions",
        "ec2:DescribeNetworkInterfaces"
      ],
      "Resource": "*"
    }
  ]
}
```


## Data Providers

### Creating the secrets for accessing DB

On `Secret Manager` you need to create 2 secrets to access the DB

### Accessing the secrets

Make sure your DMN role has such permission policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowDMSSecretsManagerWithKMSRole",
      "Effect": "Allow",
      "Action": [
        "secretsmanager:DescribeSecret",
        "secretsmanager:GetSecretValue"
      ],
      "Resource": [
        "arn:aws:secretsmanager:us-east-1:225774417763:secret:jumpbox-g2sentry-dev-db-4qfB88"
      ]
    },
    {
      "Sid": "KMS",
      "Effect": "Allow",
      "Action": [
        "kms:Encrypt",
        "kms:ReEncryptFrom",
        "kms:ReEncryptTo",
        "kms:Decrypt"
      ],
      "Resource": [
        "arn:aws:kms:us-east-1:225774417763:key/*"
      ],
      "Condition": {
        "StringEquals": {
          "kms:CallerAccount": "225774417763",
          "kms:ViaService": [
            "secretsmanager.us-east-1.amazonaws.com"
          ],
          "kms:EncryptionContext:SecretARN": [
            "arn:aws:secretsmanager:us-east-1:225774417763:secret:jumpbox-g2sentry-dev-db-4qfB88"
          ]
        }
      }
    },
    {
      "Sid": "KMSDescribeKey",
      "Effect": "Allow",
      "Action": [
        "kms:DescribeKey"
      ],
      "Resource": [
        "arn:aws:kms:us-east-1:225774417763:key/*"
      ],
      "Condition": {
        "StringEquals": {
          "kms:CallerAccount": "225774417763",
          "kms:ViaService": "secretsmanager.us-east-1.amazonaws.com"
        }
      }
    },
    {
      "Sid": "KMSListAliases",
      "Effect": "Allow",
      "Action": [
        "kms:ListAliases"
      ],
      "Resource": "*"
    }
  ]
}
```

## Used services

- security groups
- roles
- policies
- VM
- DMS
  - collectors
  - providers
- s3
- secrets manager
- 