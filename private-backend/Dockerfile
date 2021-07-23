FROM python:3.6

ENV PYTHONUNBUFFERED 1

# copy code app code to docker
RUN mkdir /app
WORKDIR /app
COPY ./app /app

# install deps
COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

#set the mount volume for the database
RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static
RUN adduser user

RUN chown -R user:user /vol/
RUN chmod -R 755 /vol/web
USER user
