Conexión a servidor SSL mediante ghostunnel
==========================================
# Pasos para ejecutar prueba de concepto
Pruebas que se pueden ejecutar de forma manual

1. Utilizar un servidor Centos-5.3 o descargar imagen de un centos antiguo. La preba aplica para un servidor Red Hat Enterprise Linux Server release 5.3 (Tikanga)
```sh
$ docker pull gpmidi/centos-5.3
```
2. En el servidor descargar ghostunnel o usar crear el directorio "tunnel" para descargar el siguiente archivo 
```sh
$ wget https://github.com/ghostunnel/ghostunnel/releases/download/v1.5.3/ghostunnel-v1.5.3-linux-amd64-with-pkcs11
```
3. En caso de usar una imagen descargada se debe iniciar contenedor y usar terminal bash, montando el directorio anterior
```sh
$ docker run -it -v ~/src/tunnel:/root gpmidi/centos-5.3 bash
```
4. Iniciar la aplicación ghostunnel
```sh
$ cd /root
$ ./ghostunnel-v1.5.3-linux-amd64-with-pkcs11 client --listen=127.0.0.1:8080 --target=reqres.in:443 --override-server-name=reqres.in  --unsafe-listen --disable-authentication
```
5. En otro terminal probar conexión, en el servidor configurado o en el mismo contenedor
```sh
$ curl -v --header "Host: reqres.in" -X GET "http://127.0.0.1:8080/api/users\?page\=2"
```
# Configuración en Servidor real
Pasos para configurar servidor definitivo y configurar ghostunnel como servicio iniciado automáticamente. Se debe agregar los archivos binarios en el servidor que ejecutará el tunnel.
1. Descargar la aplicación en la ruta ejecutable, agregar el servicio
```sh
$ wget https://github.com/ghostunnel/ghostunnel/releases/download/v1.5.3/ghostunnel-v1.5.3-linux-amd64-with-pkcs11
$ cp ghostunnel-v1.5.3-linux-amd64-with-pkcs11 /usr/bin/
$ chmod +x /usr/bin/ghostunnel-v1.5.3-linux-amd64-with-pkcs11
```
2. Descargar archivo chkconfig que permitirá iniciar la aplicación como servicio
```sh
$ cp ./chkconfig/ghostunnel /etc/init.d/
$ chmod +x /etc/init.d/ghostunnel
$ chkconfig --add ghostunnel
$ chkconfig --level 2345 ghostunnel on
$ service ghostunnel start
```
