FROM postgres:latest

ENV POSTGRES_DB users
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD password

COPY init.sql /docker-entrypoint-initdb.d/