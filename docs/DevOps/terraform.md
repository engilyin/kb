# Terraform

## Run locally

You need to prepare the auth env first
```
#Go to the folder with main.tf script

gcloud auth login
#set proper project and settings

#activate the TF SA

gcloud auth activate-service-account --key-file sa-key.json
gcloud auth list

#Now you can run terraform

terraform init -reconfigure -var-file=../../env/sbx/general.tfvars -var-file=./env/sbx/my-bucket.tfvars -backend-config=./env/sbx/backend.cfg

```


## Repaving

no, in your case you create from resource

```
-target=google_compute_instance.load-web["somevmname01"]

``` 

or you can try another instead of destroy and create

```
taint google_compute_instance.load-web["somevmname01"] 

```
- in this case you marked a resource which will be recreated when you run terraform apply


## Service Accounts

```
it is also possible to create the service accounts through terraform:

resource "google_service_account" "broker_gsa" {
  account_id = var.gsa_name
}


resource "google_service_account_iam_member" "broker_binding" {
  role               = "roles/iam.workloadIdentityUser"
  member             = "serviceAccount:${var.project_id}.svc.id.goog[${var.space}-${var.broker_name}]"
  service_account_id = google_service_account.broker_gsa.name
}
```


## Windows VM

### Set admin password

The `PowerScript` to create the password using `New-LocalUser`, `Add-LocalGroupMember` to add the user into `Administrators` group

