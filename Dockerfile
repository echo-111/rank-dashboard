FROM node:14.18.3-alpine AS build
WORKDIR /base
COPY . .
RUN npm install
RUN npm run build

FROM node:14.18.3-alpine AS production
ENV NODE_ENV=production
RUN npm install -g serve@14.2.0
WORKDIR /app
COPY --from=build /base/build ./build/

EXPOSE 3000
CMD ["serve", "-s", "build"]
