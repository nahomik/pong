# Use the official Nginx image as a base
FROM nginx:alpine

# Copy the HTML, CSS, and JS files to the Nginx directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80