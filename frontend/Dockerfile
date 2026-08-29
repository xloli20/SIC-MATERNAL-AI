FROM node:18-alpine
WORKDIR /app

# Install deps (expects package.json in frontend/)
COPY package.json package-lock.json* ./
RUN npm install --production=false || true

# Copy source and expose dev port
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
