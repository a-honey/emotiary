# Use an official Node.js runtime as the base image
FROM node:18.17 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY team2/back/package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY team2/back ./

# Build the TypeScript application
RUN npm run build

# Use an official Nginx runtime as the final image
FROM nginx:1.21

# Copy the built TypeScript application from the build image
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
