# twelve-factor-app
Twelve-Factor App utilizing Node.js and Docker

Docker:

Build: docker build --no-cache -t mf/epuppy:1.0 .

Run: docker run -it -p 9090:8080 -v ${pwd}:/usr/src/app mf/epuppy:1.0

Compose: docker-compose up



