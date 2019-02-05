FROM node:10

RUN yarn
RUN yarn build

EXPOSE 80 443 3000 35729 8080

# Set development environment as default
ENV NODE_ENV development



CMD ["yarn", "serve"]
