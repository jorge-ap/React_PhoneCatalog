FROM maven as builder
COPY . /code
WORKDIR /code
RUN mvn package

FROM openjdk:11
COPY --from=builder /code/target/*.jar /usr/app/
WORKDIR /usr/app
CMD [ "java", "-jar", "BackendPhone-1.0.jar" ]  