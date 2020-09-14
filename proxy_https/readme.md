Conexión a servidor SSL mediante ghostunnel
==========================================
# Pasos para ejecutar prueba de concepto
Pruebas que se pueden ejecutar de forma manual

1. Descargar imagen de un centos antiguo. La imagen de producción es un Red Hat Enterprise Linux Server release 5.3 (Tikanga)
```sh
$ docker pull gpmidi/centos-5.3
```
2. Descargar ghostunnel
```sh
$ wget https://github.com/ghostunnel/ghostunnel/releases/download/v1.5.3/ghostunnel-v1.5.3-linux-amd64-with-pkcs11
```
3. Iniciar contenedor y usar terminal bash
```sh
$ docker run -it -v ~/src/github/lab/proxy_https:/root gpmidi/centos-5.3 bash
```
4. Iniciar tunnel dentro del contenedor
```sh
$ cd /root
$ bash-3.2# ./ghostunnel-v1.5.3-linux-amd64-with-pkcs11 client --listen=127.0.0.1:8080 --target=reqres.in:443 --override-server-name=reqres.in  --unsafe-listen --disable-authentication
```
5. En otro terminal probar conexión en el mismo contenedor
```sh
$ curl -v --header "Host: reqres.in" -X GET "http://127.0.0.1:8080/api/users\?page\=2"
```
# Configuración en Servidor real
Pasos para configurar servidor definitivo. Se debe agregar los archivos binarios en el servidor que ejecutará el tunnel.
1. Descargar la aplicación en la ruta ejecutable, agregar el servicio
```sh
$ wget https://github.com/ghostunnel/ghostunnel/releases/download/v1.5.3/ghostunnel-v1.5.3-linux-amd64-with-pkcs11
$ cp ghostunnel-v1.5.3-linux-amd64-with-pkcs11 /usr/bin/
$ chmod +x /usr/bin/ghostunnel-v1.5.3-linux-amd64-with-pkcs11
$ cp ./chkconfig/ghostunnel /etc/init.d/
$ chmod +x /etc/init.d/ghostunnel
$ chkconfig --add ghostunnel
$ chkconfig --level 2345 ghostunnel on
$ service ghostunnel start
```
