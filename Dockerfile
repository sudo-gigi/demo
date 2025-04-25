FROM node:23.11.0-alpine3.21
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev --prefer-offline && npm cache clean --force
COPY . .
RUN adduser -D appuser && chown -R appuser:appuser /app
USER appuser
ENV NODE_ENV=production PORT=3001
EXPOSE 3001
HEALTHCHECK --interval=30s CMD curl -f http://localhost:3001/health || exit 1
CMD ["node", "server.js"]
