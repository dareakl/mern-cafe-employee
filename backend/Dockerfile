# Use a compatible Node.js version
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the application port
EXPOSE 4001

# Command to run your app
CMD ["node", "server.js"]  # Adjust if your entry point is different
