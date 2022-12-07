docker exec -it mysql_container bash -c "chmod 0775 docker-entrypoint-initdb.d/init.sh"
docker exec -it mysql_container bash -c "./docker-entrypoint-initdb.d/init.sh"