# 生成步骤

* openssl genrsa -des3 -passout pass:x -out server.pass.key 2048 
* openssl rsa -passin pass:x -in server.pass.key -out server.key
* openssl req -new -key server.key -out server.csr
* 输入证书相关信息（随意填写）
* openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
* rm server.pass.key
