# GCS Bucket

## RetrySettings

By default:

```java
RetrySettings{totalTimeout=PT50S, initialRetryDelay=PT1S, retryDelayMultiplier=2.0, maxRetryDelay=PT32S, maxAttempts=6, jittered=true, initialRpcTimeout=PT50S, rpcTimeoutMultiplier=1.0, maxRpcTimeout=PT50S}
```

if we are set it from builder:

```java
RetrySettings{totalTimeout=PT0S, initialRetryDelay=PT0S, retryDelayMultiplier=10.0, maxRetryDelay=PT0S, maxAttempts=0, jittered=true, initialRpcTimeout=PT0S, rpcTimeoutMultiplier=1.0, maxRpcTimeout=PT0S}
```

https://cloud.google.com/storage/docs/gsutil/addlhelp/RetryHandlingStrategy


## Suggested solution:

Default params makes such trys: `1+2+4+8+16+32(exceed 50 sec?)`
Setting `max-attempts: 10` will give us: `1+2+4+8+16+32+32+32+32+32`
which increase the wait time from 50 up to 3 mins.

There is no reason to increase it more than 3 minutes since clients have own connection timeout.
