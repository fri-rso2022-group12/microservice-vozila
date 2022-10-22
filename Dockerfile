#
#	Build image
#
FROM node:17.3.0-alpine as build

WORKDIR /root

COPY . ./

RUN npm install && \
	npm run build

#
#	Production image
#
FROM node:17.3.0-alpine

#
#	Arguments
#
ARG ARCH='amd64'
ARG BUILD_DATE
ARG VCS_REF
ARG VCS_SRC
ARG VERSION

#
#	Environment variables
#
ENV ARCH="${ARCH}" \
	CONTAINER_GROUP="node" \
	CONTAINER_USER="node" \
	DOCKER_CONTAINER=true \
	HOME="/root" \
	NODE_ENV="production" \
	PS1="\[\e]0;\u@\h: \w\a\]\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ " \
	TERM="xterm" \
	VISUAL="nano"

#
#	Install framework
#
ADD https://raw.githubusercontent.com/SloCompTech/s6-overlay-framework/master/setup.sh /tmp/setup.sh
RUN chmod +x  /tmp/setup.sh && \
  /tmp/setup.sh && \
	rm /tmp/setup.sh

#
#	Add local files to image
#
COPY root /
COPY --from=build /root/dist /root/package.json /root/package-lock.json /app/
RUN cd /app && \
	npm install --only=prod

ENTRYPOINT ["/init"]
