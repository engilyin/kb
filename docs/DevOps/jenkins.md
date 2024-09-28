# Jenkins


## Call cf command

```groovy

#!groovy



def login(url, org, space){

withCredentials([usernamePassword(credentialsId: env.CredsToUse, usernameVariable: 'uName', passwordVariable: 'password')]) {
	CONNECT = sh (
				script: "cf login -a ${url} -u \"${uName}\" -p \"${password}\" -o ${org} -s ${space}",
				returnStatus: true
			)
	sh """
		${env.PCF_COMMAND}
		"""
}
}

ansiColor('xterm') {

node {
	timeout(time: 30, unit: 'MINUTES') {

		stage('Preparation') {
			env.PATH = "/usr/sbin:$env.PATH"
			env.PATH = "/home/jenkins/bin:$env.PATH"
			env.PATH = "/apps/home/builder/bin:$env.PATH"

			env.LANG = "en_US.UTF-8"
			env.LC_ALL = "en_US.UTF-8"
			env.LANGUAGE = "en_US.UTF-8"

			def regionUrlFragment;
			switch(params.gcpRegion){
				case "us-central-1":
					regionUrlFragment = 'usc1'
					break
				case "us-west-1":
					regionUrlFragment = 'usw1'
					break
			}
			env.PCF_API =  params.pcfApiEndpoint
			env.PCF_ORG = params.pcfOrg
			env.PCF_SPACE = params.pcfSpace
			env.PCF_APP = params.pcfApp
			env.PCF_COMMAND = params.pcfCommand
		}
		// stage('Approve Route Changes'){
		//   input 'Please approve ClareityIAM Route management in production'
		// }
		stage('Exec')
		{
				login(env.PCF_API, env.PCF_ORG, env.PCF_SPACE)

		}

	}
}
}

```


## Touch the endpoint

```groovy
    stage('Stage 2') {
      steps {
        timeout(time: 1, unit: 'MINUTES') {
          waitUntil {
            script {
              echo 'This stage should succeed immediately if google.com is up, otherwise jenkins will retry until 1min runs out.'
              def status = sh script: 'wget -q https://google.com -O /dev/null', returnStatus: true
              return (status == 0)
            }
          }
        }
      }
    }
```