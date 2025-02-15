# Elastic Container Service

## Fargate

### Remove old templates

Jenkins generates lots of templates if not using override pre-defined template.

To clean up we can use:

```shell

aws ecs list-task-definitions --family linux-java-fargate-linuxJavaFargateTemplate --query "taskDefinitionArns" --output json | jq -r '.[]' | xargs -I {} aws ecs deregister-task-definition --task-definition {}

```