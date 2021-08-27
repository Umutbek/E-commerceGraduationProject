FROM python:3.9-alpine3.13
LABEL maintainer="karimovumutbek@gmail.com"

ENV PYTHONUNBUFFERED 1

COPY requirements.txt /requirements.txt
COPY ./app /app
WORKDIR /app


EXPOSE 8000

RUN apk update && apk upgrade && \
    pip install -r /requirements.txt &&\
    adduser --disabled-password --no-create-home app

USER app

