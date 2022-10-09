FROM python:3.9.11-alpine

ENV AWSCLI_VERSION='2.7.35'

RUN pip install --quiet --no-cache-dir awscli==${AWSCLI_VERSION}

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]