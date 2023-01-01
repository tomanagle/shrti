FROM golang:1.19 as base

# ENV GO111MODULE=on
# ENV GOFLAGS=-mod=vendor


# RUN apt-get update && apt-get install -y \
#     nohup \
#     && rm -rf /var/lib/apt/lists/*

# COPY . .

# COPY build.sh /build.sh

# RUN chmod +x /build.sh

# RUN ls

# COPY redirect-service /redirect-service
# COPY tls-check /tls-check

# ENTRYPOINT ["./build.sh"]

