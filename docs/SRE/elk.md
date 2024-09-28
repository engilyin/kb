# ELK


## Wildcard query

You can use Elasticsearch query syntax to set some filters. E.g. widcard query:

```json
{"wildcard":{"labels.application":"my-app-*"}}
```



## Troubleshooting


Some performance degradation on Redis might happen due to APM span compression.
Turn it off:

```
-Delastic.apm.span_compression_enabled=false
```
