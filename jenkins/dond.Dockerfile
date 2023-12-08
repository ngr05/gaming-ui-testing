FROM docker:dind

ADD ./jenkins/ZscalerRootCertificate-2048-SHA256.crt /tmp/ZscalerRootCertificate.crt
RUN cp /tmp/ZscalerRootCertificate.crt /etc/ssl/certs/ZscalerRootCertificate.crt
