FROM ubuntu:18.04

RUN apt-get update && apt-get install -y npm nodejs

RUN groupadd -r ubuntu && useradd -r -g ubuntu ubuntu && \
    mkdir /home/ubuntu && chown ubuntu:ubuntu /home/ubuntu
RUN npm install -g npm
USER ubuntu
RUN mkdir -p /home/ubuntu/api
WORKDIR /home/ubuntu/api
COPY package*.json ./
RUN npm install

COPY --chown=ubuntu:ubuntu . /home/ubuntu/api

CMD ["npm", "run", "dev"]

