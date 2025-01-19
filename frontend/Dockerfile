# Use official Node.js image to build the app
FROM node:latest AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .
# Expose port 80 for nginx
EXPOSE 5173

CMD ["npm", "run", "dev"]