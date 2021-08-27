FROM python:3.9-alpine3.13
LABEL maintainer="karimovumutbek@gmail.com"

ENV PYTHONUNBUFFERED 1

COPY requirements.txt /requirements.txt
COPY ./app /app
WORKDIR /app


EXPOSE 8000

RUN apk update && apk upgrade && \
    apk add --update --no-cache postgresql-client gettext jpeg-dev &&  \
    apk add --update --no-cache --virtual .tmp-build-deps \
       gcc postgresql-dev musl-dev zlib-dev linux-headers &&\
    pip install -r /requirements.txt &&\
    apk del .tmp-build-deps &&\

    adduser --disabled-password --no-create-home app

USER app

