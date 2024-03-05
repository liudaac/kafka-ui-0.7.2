![UI for Apache Kafka logo](documentation/images/kafka-ui-logo.png) UI for Apache Kafka&nbsp;
------------------
#### Versatile, fast and lightweight web UI for managing Apache Kafka® clusters. Built by developers, for developers.
<br/>

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/provectus/kafka-ui/blob/master/LICENSE)
![UI for Apache Kafka Price Free](documentation/images/free-open-source.svg)
[![Release version](https://img.shields.io/github/v/release/provectus/kafka-ui)](https://github.com/provectus/kafka-ui/releases)
[![Chat with us](https://img.shields.io/discord/897805035122077716)](https://discord.gg/4DWzD7pGE5)
[![Docker pulls](https://img.shields.io/docker/pulls/provectuslabs/kafka-ui)](https://hub.docker.com/r/provectuslabs/kafka-ui)

<p align="center">
    <a href="https://docs.kafka-ui.provectus.io/">DOCS</a> • 
    <a href="https://docs.kafka-ui.provectus.io/configuration/quick-start">QUICK START</a> • 
    <a href="https://discord.gg/4DWzD7pGE5">COMMUNITY DISCORD</a>
    <br/>
    <a href="https://aws.amazon.com/marketplace/pp/prodview-ogtt5hfhzkq6a">AWS Marketplace</a>  •
    <a href="https://www.producthunt.com/products/ui-for-apache-kafka/reviews/new">ProductHunt</a>
    <a href="https://github.com/provectus/kafka-ui/blob/master/README.md">Official README</a>
</p>

#### UI for Apache Kafka is a free, open-source web UI to monitor and manage Apache Kafka clusters.

Compared to the official latest version 0.7.1, the current project has made three upgrades:

* Added the following configuration items to the Topic list:
BytesIn/sec
BytesOut/sec
Msg/sec
Msg-5min/sec
Fetch/sec
Fetch5min/sec
Produce/sec
Produce5min/sec
This has two advantages: it aligns display items with Kafka-Manager and makes the list display more intuitive.

* Added BytesIn/sec and BytesOut/sec to the Broker list, allowing for Broker-level data throughput statistics.

* Adapted the retrieval of ActiveController to the Kraft protocol, addressing a bug in the official version.

* Replaced the concept of the jmxport configuration item. Previously, a cluster could only use one jmxport. Now, the concept of jmxport-offset has been introduced, where the actual jmxport of the broker = brokerport + jmxport-offset, thus supporting single-machine mixed deployment scenarios.
