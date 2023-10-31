FROM docker.io/library/node:18.18.2@sha256:c17242d6586a6ee077d1214a079b1c92ca7b5182bdba52f74d1c040cf2a940c5 AS build

WORKDIR /tmp

COPY ./ /tmp

RUN npm install && \
    npm run build


FROM ghcr.io/vtcs5704-team1/nginx/vib:main@sha256:19c5c15eaa42a9f741cb60f9672460970ac8ff73f15ecb54639c9181d23c17a2

COPY --from=build /tmp/build /usr/share/nginx/html

