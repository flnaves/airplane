FROM node:latest
WORKDIR /usr/app

COPY . .

EXPOSE 3000
RUN chown ${ISC_PACKAGE_MGRUSER}:${ISC_PACKAGE_IRISGROUP} /usr/app
USER ${ISC_PACKAGE_MGRUSER}

CMD [ "./yarn-bash.sh" ]