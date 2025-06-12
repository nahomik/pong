FROM nginx:alpine

# Copy only the website files from src/ into nginx root
COPY src/ /usr/share/nginx/html/

EXPOSE 80
