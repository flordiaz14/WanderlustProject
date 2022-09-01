# Package
FROM debian:bullseye AS package
COPY src /home/app/src
COPY pom.xml /home/app
COPY wanderlust.sql /home/app/
RUN apt update && apt upgrade -y && apt install gnupg -y &&\
    apt install openjdk-11-jdk -y && apt install openjdk-11-jre -y && \
    apt install maven -y &&\
    apt install mariadb-client mariadb-server -y && apt-get -y install systemd
RUN service mariadb start && mysql -u root mysql < /home/app/wanderlust.sql & mvn -f /home/app/pom.xml clean package
EXPOSE 8080
#ENTRYPOINT ["java","-jar","/home/app/target/wanderlust-0.0.1-SNAPSHOT.jar"]
ENTRYPOINT ["bash"]

