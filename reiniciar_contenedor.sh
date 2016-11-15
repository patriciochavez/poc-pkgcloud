#!/bin/bash
sudo docker ps --all | grep cliente_node_pkgcloud | awk {'print $1}' | xargs sudo docker rm -f
#sudo docker build --no-cache -t patriciochavez/controller-fe .
sudo docker build -t patriciochavez/controller-fe-pkgcloud .
sudo docker run -p 3000:3000 -d --name cliente_node_pkgcloud patriciochavez/controller-fe-pkgcloud
