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
    <a href="https://www.producthunt.com/products/ui-for-apache-kafka/reviews/new">ProductHunt</a>  •
    <a href="https://github.com/provectus/kafka-ui/blob/master/README.md">Official README</a>
</p>

#### UI for Apache Kafka is a free, open-source web UI to monitor and manage Apache Kafka clusters.

Compared to the official latest version 0.7.1, the current project has made 5 upgrades:

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

![Topics视图](https://minishop.oss-cn-beijing.aliyuncs.com/topics.jpg)]

* Added BytesIn/sec and BytesOut/sec to the Broker list, allowing for Broker-level data throughput statistics.

![Brokers视图](https://minishop.oss-cn-beijing.aliyuncs.com/brokers.jpg)]

* Adapted the retrieval of ActiveController to the Kraft protocol, addressing a bug in the official version.

* Replaced the concept of the jmxport configuration item. Previously, a cluster could only use one jmxport. Now, the concept of jmxport-offset has been introduced, where the actual jmxport of the broker = brokerport + jmxport-offset, thus supporting single-machine mixed deployment scenarios.

* Add support for acl-creation in the listpage

![ACL创建入口](https://minishop.oss-cn-beijing.aliyuncs.com/acls.png)]
![ACL创建表单](https://minishop.oss-cn-beijing.aliyuncs.com/acladdpage.png)]

#### Build Approach

* Setup nodejs by nvm

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nvm install 16.15.0

* Root directory of the project

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mvn clean package -DskipTests

* Build react-app and copy to kafka-ui-api

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cd kafka-ui-react-app/<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;npm run build<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cd build/<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cp -r * ../../kafka-ui-api/src/main/resources/static/<br>

* Root directory of the project

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mvn clean package -DskipTests<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cd kafka-ui-api/target<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Then you can see the release jar "kafka-ui-0.7.2.jar"<br>

* Run jar

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;java  -Dspring.config.additional-location=application-local.yml --add-opens java.rmi/javax.rmi.ssl=ALL-UNNAMED -jar kafka-ui-api-0.7.2.jar
