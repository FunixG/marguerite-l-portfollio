FROM amazoncorretto:25-alpine

ARG jar_file

WORKDIR /container/java

COPY ${jar_file} /container/app/service.jar
RUN mkdir data

ENTRYPOINT ["/bin/sh", "-c", "java -jar -Xms150M -XX:MaxRAMPercentage=95.0 /container/app/service.jar"]
