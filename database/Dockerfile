FROM mysql:8

COPY scripts/init.sql /docker-entrypoint-initdb.d/

EXPOSE 3306

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=quackchat
