#!/usr/bin/env sh

docker network create jenkins || true;

docker stop jenkins-docker jenkins-blueocean || true;
docker rm jenkins-docker jenkins-blueocean || true;

docker volume rm jenkins-data jenkins-docker-certs

docker run \
  --name jenkins-docker \
  --rm \
  --detach \
  --privileged \
  --network jenkins \
  --network-alias docker \
  --env DOCKER_TLS_CERTDIR=/certs \
  --volume jenkins-docker-certs:/certs/client \
  --volume jenkins-data:/var/jenkins_home \
  --publish 2376:2376 \
  docker:dind \
  --storage-driver overlay2;

docker build -f ./jenkins/development.Dockerfile -t dev-jenkins-blueocean:2.414.2-1 .

docker run \
  --name jenkins-blueocean \
  --restart=on-failure \
  --detach \
  --network jenkins \
  --env DOCKER_HOST=tcp://docker:2376 \
  --env DOCKER_CERT_PATH=/certs/client \
  --env DOCKER_TLS_VERIFY=1 \
  --publish 8080:8080 \
  --publish 50000:50000 \
  --volume jenkins-data:/var/jenkins_home \
  --volume jenkins-docker-certs:/certs/client:ro \
  dev-jenkins-blueocean:2.414.2-1

docker network ls;
docker ps -a;

sleep 15

echo 'admin password'
docker exec -t jenkins-blueocean cat /var/jenkins_home/secrets/initialAdminPassword