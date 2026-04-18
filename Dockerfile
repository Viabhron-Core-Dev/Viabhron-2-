# Use a lightweight Node.js image
FROM node:22-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm install --production --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Build the frontend (Vite)
RUN npx vite build

# Expose the port (Cloud Run uses 8080 or 3000)
EXPOSE 3000

# Start the "Office" server
CMD ["npm", "run", "start"]
