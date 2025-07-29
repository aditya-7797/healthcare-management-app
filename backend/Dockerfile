FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy backend source code
COPY . .

# Expose port
EXPOSE 5000

# Start the app with nodemon
CMD ["npx", "nodemon", "index.js"]
