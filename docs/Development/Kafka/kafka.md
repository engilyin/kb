# Kafka


## Troubleshooting

### Kerberos

```
-Dsun.security.krb5.debug=true
```

## Theory

ISR (In-Sync Replica) - replica partition received from the Leader partition

`at least once` - commit after message has been processed. Can result duplicate prcessing. So we need indepotent consumer.
`at most once` - commit when message has been received. If it fail we never process it again.
`exactly once` - guaranty once processing. Either Transactional API (for Kafka to Kafka). Or Indepotent Consumer


### producer
Acknolegemnt Strategy
acks=0 do not wait for acknolegment (possible data loss)
acks=1 wait from leader (limited data loss)
acks=all wait for all replicas will acknoledge (no data loss)

## CLI commands

Create new topic
```
kafka-topics --create --bootstrap-server localhost:9092 --topic my-topic --replication-factor 1 --partitions 3 

kafka-topics --create --bootstrap-server localhost:9092 --topic my-topic --replication-factor 1 --partitions 3 \
      --config cleanup.policy=compact \
      --config min.cleanup.dirty.ratio=0.001 \
      --config segments.ms=5000
```

Describe topic
```
kafka-topics --bootstrap-server localhost:9092 --topic my-topic --describe
```

Get kafka config params:
```
kafka-configs
```

Configure topic 
```
kafka-configs --bootstrap-server localhost:9092 --entity-type topics --entity-name my-topic --describe
kafka-configs --bootstrap-server localhost:9092 --entity-type topics --entity-name my-topic --alter --add-config min.insync.replicas=2
kafka-configs --bootstrap-server localhost:9092 --entity-type topics --entity-name my-topic --alter --delete-config min.insync.replicas
```

### producer

```
kafka-console-producer --bootstrap-server localhost:9092 --topic my-topic \
            --property parse.key=true \
            --property key.separator=,
```

### consumer

```
kafka-console-consumer --bootstrap-server localhost:9092 --topic my-topic \
            --from-beginning \
            --property print.key=true \
            --property key.separator=,

```


## Tune up

### Performance

- latency
- throughput
- durability
- availability

1. Smart batching helps to increase troughput while maintaining very low latency

Producers tries to send record asap. It will have up to `max.in.flight.requests.per.connection=5`
Which means max 5 message batches being in flight (being sent between the producer and broker) 

If more messages are coming while others in flight Kafka batch it.

2. Compression

more batching - more efficient Compression.

Use producer level compression


3. `linger.ms` (default 0) and `batch.size` (default 16Kb)

How long to wait before send the batch. Helps to get bigger batches and send more at once in expence of latency.

`batch.size` force batch sending before `linger.ms`


### Segments

`log.segment.bytes` - max size of a single segment in bytes (default 1Gb)
`log.segment.ms` the time Kafka will wait before commiting the segment if not full (default 1 week)

Smaller segments: often log compactions and more opened files

You may consider more segments if you have low throughput so compaction get more offen.


### Cleanup policy

`log.cleanup.policy` could be `delete` (based on age, week is default or size. default infinite), `compact` (use latest key)

`log.retntion.hours` number of hours to keep data (default 168 - one week) also `log.retntion.minutes`, `log.retntion.ms` (milliseconds) -1 means infinit

`log.retention.bytes` - max size in bytes for each partition size (default -1 infinit)


### Networking

Rack awarnes: Kafka Consumers Replica Fetching (since 2.4+). To improve latency and decrise network costs:
- for the broker:
   - set `rack.id` 
   - `replicka.selector.class` = `org.apache.kafka.common.replica.RackAwareReplicaSelector`
- for  client:
  - `client.rack`



### compact

`delete.retention.ms` (default 24 hrs) how long consumer can see deleted records


### Compression

`none`, `gzip`, `snappy`, `lz4`, `zstd`


### Broker Configuration:

    Adjust `num.partitions` and `default.replication.factor` based on your workload and redundancy requirements.
    Tune `log.segment.bytes` and `log.segment.ms` to control the size and frequency of log segment rolling.
    Set appropriate values for `num.io.threads`, `num.network.threads`, `socket.receive.buffer.bytes`, and `socket.request.max.bytes` based on your hardware and workload.

### Producer Configuration:

    Configure `batch.size`, `linger.ms`, and compression.type to optimize producer throughput and latency.
    Set `max.in.flight.requests.per.connection` to balance between throughput and reliability.
    Adjust acks to control the durability guarantee provided by Kafka.

### Consumer Configuration:

    Tune `fetch.min.bytes`, `fetch.max.wait.ms`, and `max.poll.records` to balance between latency and throughput.
    Set appropriate values for `enable.auto.commit`, `auto.commit.interval.ms`, and `auto.offset.reset` (earliest|latest| or error for other vals) based on your application's requirements.
    Use consumer groups efficiently to parallelize processing.

### Topic Configuration:

    Configure retention policies (`retention.ms`, `retention.bytes`) based on your data retention requirements.
    Adjust `cleanup.policy` to control log retention and deletion strategy.
    Set `segment.bytes` and `segment.ms` to optimize log segment rolling.

## Commit Strategy

- Auto offset commit behaviour

`auto.commit.interval.ms=5000` `enable.auto.commit=true`

For Kafka Streams
props.put(StreamsConfig.PROCESSING_GUARANTEE_CONFIG, StreamsConfig.AT_MOST_ONCE);

props.put(StreamsConfig.NUM_STREAM_THREADS_CONFIG, 4); // Set the number of stream threads to 4