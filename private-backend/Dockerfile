FROM python:3.6

ENV PYTHONUNBUFFERED 1

# copy code app code to docker
RUN apt-get update && apt-get install -y && mkdir /app
WORKDIR /app
COPY ./app /app

# install deps
COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

#set the mount volume for the database and create new user
RUN mkdir -p /vol/web/media && \
    mkdir -p /vol/web/static && \
    useradd -ms /bin/bash user && \
    chown -R user:user /vol/ && \
    chmod -R 755 /vol/web
USER user
