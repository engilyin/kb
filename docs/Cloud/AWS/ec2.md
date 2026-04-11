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

## Troubleshooting

### Amazon SSM Agent is not starting

#### Root Cause

The most common reason SSM Agent fails to start on a Windows EC2 instance is an **inability to reach the EC2 Instance Metadata Service (IMDS)** at `169.254.169.254`. SSM Agent depends on IMDS to retrieve the AWS region, instance identity, and temporary IAM credentials at startup. Without these, the agent cannot initialize and remains in a stopped state.

This issue frequently occurs on instances running **Docker or Windows Containers**, where the Hyper-V NAT virtual switch (`vEthernet (nat)`) injects routes for the `169.254.169.x` range that point to an incorrect or unreachable gateway — silently overriding the correct EC2-provided route.

#### Diagnostic Steps

**Step 1: Run the SSM diagnostics tool**

```powershell
cd "C:\Program Files\Amazon\SSM"
.\ssm-cli.exe get-diagnostics --output table
```

If the output shows `EC2 IMDS: Failed` and all endpoint connectivity checks as `Skipped`, IMDS is unreachable and that is the root cause. Proceed to Step 2.

**Step 2: Test TCP connectivity to IMDS**

```powershell
Test-NetConnection -ComputerName 169.254.169.254 -Port 80
```

If `TcpTestSucceeded` is `False`, the instance cannot reach IMDS at the network level.

**Step 3: Inspect the route table**

```powershell
Get-NetRoute | Where-Object {$_.DestinationPrefix -eq "169.254.169.254/32"} | Select-Object DestinationPrefix, NextHop, InterfaceAlias, InterfaceIndex, RouteMetric
```

Verify that:
- The route exists and is bound to your primary network adapter (e.g. `Ethernet`)
- The `NextHop` matches your actual default gateway

Find your actual default gateway with:

```powershell
Get-NetRoute | Where-Object {$_.DestinationPrefix -eq "0.0.0.0/0"} | Select-Object NextHop, InterfaceAlias
```

If the `NextHop` on the IMDS route does **not** match your default gateway, that is your problem — the route is pointing to an incorrect or unreachable gateway.

**Step 4: Verify IMDS settings in AWS Console**

Check that IMDS is enabled and review the IMDSv2 setting for the instance:

```bash
aws ec2 describe-instances --instance-id <instance-id> --query "Reservations[].Instances[].MetadataOptions"
```

Confirm `HttpEndpoint` is `enabled`. If `HttpTokens` is `required` (IMDSv2 enforced), use a token-based request to test IMDS:

```powershell
$token = Invoke-RestMethod -Uri "http://169.254.169.254/latest/api/token" -Method PUT -Headers @{"X-aws-ec2-metadata-token-ttl-seconds"="21600"}
Invoke-RestMethod -Uri "http://169.254.169.254/latest/meta-data/instance-id" -Headers @{"X-aws-ec2-metadata-token"=$token}
```

#### Fix: Correct the IMDS Route

If the route has an incorrect gateway, delete it and re-add it pointing to the correct interface and gateway:

```powershell
# Remove the broken route
Remove-NetRoute -DestinationPrefix "169.254.169.254/32" -InterfaceIndex <ifIndex> -Confirm:$false

# Re-add with correct gateway (replace values from your environment)
New-NetRoute -DestinationPrefix "169.254.169.254/32" -InterfaceIndex <ifIndex> -NextHop "<default-gateway-ip>" -RouteMetric 5
```

Make the route persistent across reboots:

```powershell
route add 169.254.169.254 mask 255.255.255.255 <default-gateway-ip> metric 5 -p
```

Then restart the SSM Agent:

```powershell
Restart-Service AmazonSSMAgent
Get-Service AmazonSSMAgent
```

Run the diagnostics tool again to confirm all checks pass.

#### Summary

| Symptom | Likely Cause | Fix |
|---|---|---|
| `EC2 IMDS: Failed` | IMDS unreachable | Fix routing or firewall |
| All endpoints `Skipped` | No region info (IMDS failed) | Resolves once IMDS is fixed |
| `AWS Credentials: Skipped` | IMDS unreachable | Resolves once IMDS is fixed |
| `Agent service: Stopped` | Initialization failed | Restart after fixing IMDS |
| IMDS route points to wrong gateway | Docker/Windows Containers NAT conflict | Delete and re-add route with correct gateway |