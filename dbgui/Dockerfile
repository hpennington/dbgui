FROM ubuntu:18.10

RUN apt-get update && apt-get install -y npm nodejs

RUN groupadd -r ubuntu && useradd -r -g ubuntu ubuntu && \
    mkdir /home/ubuntu && chown ubuntu:ubuntu /home/ubuntu

USER ubuntu
RUN mkdir -p /home/ubuntu/dbgui
WORKDIR /home/ubuntu/dbgui
COPY package*.json ./
RUN npm install

COPY --chown=ubuntu:ubuntu . /home/ubuntu/dbgui

CMD ["npm", "run", "start"]

