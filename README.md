# SPA in docker container

## Introduction

This is a composition of several containers to serve a simple SPA
that supports a REST Api, Database persistance, Session persistance,
Static file serving and a proxy.

## Arquitecture

### REST Api

Is a [nodejs] container with a [Koa] sample application with two endpoints and several middleware to showcase the stack. Basically writes logs to mongo.

#### _TODO_

- [ ] Include Session middleware
- [ ] Include CORS middleware

### Database Persistance

A [mongodb] database

#### _TODO_

- [ ] Deal with more security
- [ ] Expose a debugging/monitoring tool
- [ ] For completeness sake, implement also a SQL database in another container

### Session Persistance

Sessions are stored in a [Redis] store

#### _TODO_

- [ ] Implement the actual sessions in REST API

### Static Content

A simple [nginx] serving static content, it could be
swapped in the proxy with another solution (a S3 server for instance)

### Reverse Proxy Server

A [nginx] server that proxies requests based in information like uris and headers

#### _TODO_

- [ ] Deal with SSL and HTTPS

[nodejs]: https://nodejs.org/
[Koa]: http://koajs.com/
[mongodb]: https://www.mongodb.com/
[Redis]: https://redis.io/
[nginx]: https://nginx.org/en/
