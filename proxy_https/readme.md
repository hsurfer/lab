#Conexión a servidor SSL mediante ghostunnel

1.Descargar imagen de un centos antiguo
'docker pull gpmidi/centos-5.3
La imagen de producción es un Red Hat Enterprise Linux Server release 5.3 (Tikanga)

2.Descargar ghostunnel
'wget https://github.com/ghostunnel/ghostunnel/releases/download/v1.5.3/ghostunnel-v1.5.3-linux-amd64-with-pkcs11

3.Iniciar contenedor y usar terminal bash
'docker run -it -v ~/src/github/lab/proxy_https:/root gpmidi/centos-5.3 bash

4.Iniciar tunnel dentro del contenedor
'bash-3.2# cd /root
'bash-3.2# ./ghostunnel-v1.5.3-linux-amd64-with-pkcs11 client --listen=127.0.0.1:8080 --target=reqres.in:443 --override-server-name=reqres.in  --unsafe-listen --disable-authentication

5.En otro terminal probar conexión en el mismo contenedor
'bash-3.2# curl -v --header "Host: reqres.in" -X GET "http://127.0.0.1:8080/api/users\?page\=2"

