FROM jenkins/jenkins:latest
USER root

# RUN mkdir /usr/local/share/ca-certificates/extra
ADD ./jenkins/ZscalerRootCertificate-2048-SHA256.crt /usr/local/share/ca-certificates/ZscalerRootCertificate.crt
# ADD ./jenkins/ZscalerRootCertificate-2048-SHA256.crt /usr/local/share/ca-certificates/extra/ZscalerRootCertificate.crt
# ADD ./jenkins/ZscalerRootCertificate-2048-SHA256.crt  $JAVA_HOME/conf/security/ZscalerRootCertificate.crt
RUN dpkg-reconfigure ca-certificates
RUN $JAVA_HOME/bin/keytool \
  -import \
  -alias Zscaler \
  -file /usr/local/share/ca-certificates/ZscalerRootCertificate.crt \
  -noprompt \
  -cacerts \
  -storepass changeit
RUN echo 'JAVA_ARGS="$JAVA_ARGS -Djavax.net.ssl.trustStore=/usr/local/share/ca-certificates/ZscalerRootCertificate.crt"' >> /etc/default/jenkins
# RUN update-ca-trust

RUN apt-get update && apt-get install -y lsb-release
RUN curl -fsSLo /usr/share/keyrings/docker-archive-keyring.asc \
  https://download.docker.com/linux/debian/gpg
RUN echo "deb [arch=$(dpkg --print-architecture) \
  signed-by=/usr/share/keyrings/docker-archive-keyring.asc] \
  https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
RUN apt-get update && apt-get install -y docker-ce-cli
USER jenkins
RUN jenkins-plugin-cli --plugins "blueocean docker-workflow"






# Import certificate
# openssl s_client -showcerts -connect https://your-target-server\
# < /dev/null 2> /dev/null | openssl x509 -outform PEM > ~/root_ca.pem

# Duplicate Java Keystore file and move into Jenkins...
# mkdir $JENKINS_HOME/keystore/
# was: cp $JAVA_HOME/jre/lib/security/cacerts $JENKINS_HOME/keystore/
# changed to be:
# cp /usr/local/share/ca-certificates/extra/ZscalerRootCertificate.crt $JENKINS_HOME/keystore/

# Add Certificate to Keystore
# was: keytool -import -alias $ALIAS -keystore $JENKINS_HOME/keystore/cacerts -file ~/root_ca.pem
# changed to be:
# keytool -import -alias ZscalerRootCertificate.crt -keystore $JENKINS_HOME/keystore -file /usr/local/share/ca-certificates/extra/ZscalerRootCertificate.crt

# Add -Djavax.net.ssl.trustStore=$JENKINS_HOME/keystore/cacerts to the
# Jenkins startup parameters. For Debian/Ubuntu, this is /etc/default/jenkins

# sudo service jenkins restart


# docker stop jenkins-blueocean jenkins-docker; docker rm jenkins-blueocean jenkins-docker; docker volume rm jenkins-data jenkins-docker-certs; docker network rm jenkins; docker system prune -af --volumes
# docker stop jenkins-blueocean; docker rm jenkins-blueocean; docker rmi dev-jenkins-blueocean:2.414.2-1; docker build -f ./jenkins/development.Dockerfile -t dev-jenkins-blueocean:2.414.2-1 .; docker run --name jenkins-blueocean --restart=on-failure --detach --network jenkins --env DOCKER_HOST=tcp://docker:2376 --env DOCKER_CERT_PATH=/certs/client --env DOCKER_TLS_VERIFY=1 --publish 8080:8080 --publish 50000:50000 --volume jenkins-data:/var/jenkins_home --volume jenkins-docker-certs:/certs/client:ro dev-jenkins-blueocean:2.414.2-1;
