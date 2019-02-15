FROM node:10

RUN yarn
RUN yarn build

EXPOSE 443 3000

# Set development environment as default
ENV NODE_ENV development

CMD ["yarn", "serve"]
