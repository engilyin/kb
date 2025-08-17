# EC2

## Image family

You should never use direct AMI ids. Instead you need rely on some generic name for the OS:

```
data "aws_ami" "windows2022" {
  most_recent = true

  filter {
    name   = "name"
    values = ["Windows_Server-2022-English-Full-Base-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["801119661308"] # Official AWS Windows AMI owner ID
}

resource "aws_instance" "jumpbox" {
  ami           = data.aws_ami.windows2022.id
  ...
}
```


## Define some basic image

```h
