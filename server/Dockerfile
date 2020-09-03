FROM golang:alpine

WORKDIR /go/src/app

COPY go.* ./

RUN go mod download

COPY . .

RUN go build -o server

EXPOSE 3333

ENTRYPOINT /go/src/app/server
