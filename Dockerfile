# build api (GO)
FROM golang:buster AS app-builder

RUN mkdir /butane-api
COPY ["./api", "/butane-api"]
WORKDIR /butane-api

RUN go build -o ./target/butane-api

# build ui (nodejs)
FROM node:18 as ui-builder

ARG VERSION=0.0.0

COPY ["./ui", "/home/node/app"]
WORKDIR /home/node/app

RUN yarn install
RUN yarn version --new-version ${VERSION}
RUN yarn build

# add api/ui to official butane image
FROM quay.io/coreos/butane:release

ARG VERSION=0.0.0

ENV VERSION=${VERSION}

COPY --from=app-builder ["/butane-api/target/butane-api", "/usr/local/bin/butane-api"]
COPY --from=ui-builder ["/home/node/app/build",  "/root/.butane/html"]

ENTRYPOINT ["/usr/local/bin/butane-api"]