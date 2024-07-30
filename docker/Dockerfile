FROM node:18 AS base

RUN mkdir -p /workspace/frontend

WORKDIR /workspace/frontend

FROM base AS build_frontend

COPY ./my-app/package.json /workspace/frontend/
COPY ./my-app/package-lock.json /workspace/frontend/
RUN npm install

COPY ./my-app /workspace/frontend/
RUN npm run build
# Copy source code
USER node
# Start the application
COPY --from=build /workspace/frontend/dist ./dist

#CMD ["dist/index.js"]
#CMD ["node", "dist/index.js"]
CMD ["npm", "run", "start"]