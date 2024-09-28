# GCP cheat sheet

## Current config

```bash
gcloud init

gcloud config list

gcloud config set compute/region us-west1
```




## Upload file on bucket under the Service Account



```bash
gcloud auth activate-service-account --key-file /path/to/sa-key.json
gsutil ls gs://testbucket
gsutil cp file gs://testbucket/ 
```

E.g.
```bash
gsutil cp somejar-2.0.1.jar gs://app-dev-file-exchange/clp-pdf-service/

```


## Set another project

```bash
gcloud config set project desired-project-id-here
```

## Run enter VM through the ssh

```bash
gcloud compute ssh vmname --internal-ip
```

Sometimes you may need:
```
sudo gcloud compute config-ssh
```

## List of instances and disks

```bash

gcloud compute instances list

gcloud compute disks list

```


## delete instance

```bash
gcloud compute instances delete example-instance
```


## ssh tunel

```bash
gcloud compute ssh vmname -- -L 10000:10.46.176.244:1525

#to rdp onto the Windows VM
gcloud compute ssh jumpbox --internal-ip -- -L 10005:10.39.32.204:3389

```


## copy files from VM

```bash

gcloud compute scp vmname:tmp.tar.bz2 C:\Users\MyHome\tmp\ --internal-ip

```

## How to set the Windows VM password on higher envs.

```bash
gcloud auth activate-service-account --key-file <key.json>
gcloud auth list

#wrong?
#gcloud beta compute -project "prj" -reset-windows-password 'dsfdf' -zone us-west1-a -user admin

#from doc
gcloud beta compute reset-windows-password my-instance  --zone=us-central1-f --user=foo

```

do not use Administrator it is not allowed by company policy



## Service accounts

```
gcloud iam service-accounts add-iam-policy-binding ${gsa_email} --role roles/iam.workloadIdentityUser --member "serviceAccount:${kf_project}.svc.id.goog[${brokerspace}/sa-${brokername}]" --project=$kf_project  # to set workload identity in that service account
```


## Set permissions on the bucket

```
#grant full access
gsutil acl ch -u username@domain.com:O gs://example-bucket

#remove access
gsutil acl ch -d john.doe@example.com gs://example-bucket

#get info
gsutil acl get gs://example-bucket
```

or to see on `Permissions` tab

```
gsutil iam ch serviceAccount:service-account@domain.com:roles/storage.admin  gs://example-bucket
gsutil iam ch user:username@domain.com:roles/storage.admin  gs://example-bucket
``` 

## Connect to VM via SSH

1. Create the ssh key

```
ssh-keygen -C "username@domain.com"

```

2. Add the public key to VM

```
gcloud compute instances add-metadata <vm-name> --metadata-from-file ssh-keys=./my.key.pub
```

Add external IP:
```
gcloud compute instances add-access-config ciswebwdavmsb-5b --access-config-name=scp-acces

```
2. Register it on the VM. Use impersonation if needed


## Troubleshooting

In case of encoding error from the Python stack trace try to set this env var:

```shell
set PYTHONIOENCODING=UTF-8
```
