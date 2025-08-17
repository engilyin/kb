# Docker commands and useful stuff

## Clean up

```
docker image prune -a
docker container prune
docker volume prune
```

## Start Docker on Mac (Using minicube)

### To run

```
# Start minikube
minikube start

# Tell Docker CLI to talk to minikube's VM
eval $(minikube docker-env)

# Save IP to a hostndockr buildame
echo "`minikube ip` docker.local" | sudo tee -a /etc/hosts > /dev/null
```

### To install it you would need:

```
# Install hyperkit and minikube
brew install hyperkit
brew install minikube

# Install Docker CLI
brew install docker
brew install docker-compose

```

And 

### 

- `minikube stop` - stop the VM and k8s cluster. This does not delete any data. Just run minikube start to spin up the cluster.

- `minikube delete` - This deletes the cluster with all the data. All mapped volumes will be lost. Know what you're doing before running this. If you just want to stop the cluster use minikube stop.

- `minikube ip` - IP address of the VM where the cluster and docker engine run.  

- `minikube pause` - to pause k8s related containers so they do not end up consuming system resources. `minikube` runs a k8s setup and thus runs a lot of containers that are not required if not using k8s. We can run this command to save resources.


## GCP

To uthenticate on the private registry:
```
docker login -u _token -p "$(gcloud auth print-access-token)" https://us.gcr.io
```

## Run containers from AWS

```
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=

aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/repocode

docker tag cli-java21-jenkins-agent:latest public.ecr.aws/repocode/cli-java21-jenkins-agent:1.0.3
docker push public.ecr.aws/repocode/cli-java21-jenkins-agent:1.0.3

docker tag public.ecr.aws/repocode/cli-java21-jenkins-agent:1.0.3 public.ecr.aws/repocode/cli-java21-jenkins-agent:latest
docker push public.ecr.aws/repocode/cli-java21-jenkins-agent:latest
```

if you need just to enter and check the image:

```
docker run -it --rm --name agent --entrypoint /bin/sh public.ecr.aws/repocode/cli-java21-jenkins-agent
```

If you need to work with the private repo use this command to login:
```
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-no>.dkr.ecr.us-east-1.amazonaws.com
```

if you do not have connectivity you can try to use network `host` mode instead of `bridge`

```
docker run -it --rm --name agent --network host --entrypoint /bin/sh public.ecr.aws/repocode/cli-java21-jenkins-agent

#useful commands
docker network ls
docker inspect bridge
```

### issues

If AWS token is expired try to sync the time

Synchronize the time on the host:
```
ntpdate -u pool.ntp.org
```

## Entry Point

To get image entry point

```
docker inspect -f '{{.Config.Entrypoint}}' image
```

## Docker file

```

FROM linuxserver/code-server:latest 


 

USER root


 

RUN   curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose \

    && chmod +x /usr/local/bin/docker-compose \

   && docker-compose --version \

   && apt-get update && apt-get -y install apt-transport-https vim ca-certificates curl gnupg2 software-properties-common && curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg > /tmp/dkey; apt-key add /tmp/dkey && add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") \

   $(lsb_release -cs) \

   stable" && apt-get update && apt-get -y install docker-ce  \

   && apt install -y openjdk-8-jdk 

RUN     curl -sL https://deb.nodesource.com/setup_10.x | bash - && \

        apt-get install gcc g++ make nodejs -y && \

        curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \

        echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \

        apt-get update && apt-get -y install yarn
        
```

## Compose file

```yaml
cat docker-compose.yml 

---

version: "2.1"

services:

  code-server:

    build:

      context: ./payment-service

      dockerfile: Dockerfile.code

    container_name: code-server

    environment:

      - PUID=1000

      - PGID=1000

      - TZ=Europe/London

      - PASSWORD=password #optional

      - SUDO_PASSWORD=password #optional

#    volumes:

#      - ./payment-service:/config/workspace/payment-service

    ports:

      - 8443:8443

      - 8080:8080

    restart: unless-stopped
    
```

## Command to run docker compose

```bash

docker-compose --file docker-compose.yml up --build -d

```


## See the logs:

```bash

docker logs che-server

```

## run RabbitMQ in docker

```shell
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

## run Redis

```shell
docker run -it --rm -p 6379:6379 --name redis1 redis

docker exec -it redis1 sh
redis-cli

FLUSHALL
KEYS *
DUMP spring:session:sessions:a7235355-5ebb-4800-b777-95d9b1512345
```


## stat

```
docker stat
```


## network

```
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name_or_id

docker exec container_name_or_id cat /etc/hosts 

docker inspect

docker builder prune

docker system prune
```



