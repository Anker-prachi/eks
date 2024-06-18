# Use the official Alpine image from the Docker Hub
FROM alpine:latest

# Install basic utilities (optional)
RUN apk add --no-cache bash

# Add a simple command
CMD ["echo", "Hello from Alpine!"]

