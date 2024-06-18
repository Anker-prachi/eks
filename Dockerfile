# Use the official Alpine image from the Docker Hub
FROM alpine:latest

# Set the maintainer label
LABEL maintainer="your-email@example.com"

# Install basic utilities (optional)
RUN apk add --no-cache bash

# Add a simple command
CMD ["echo", "Hello from Alpine!"]

