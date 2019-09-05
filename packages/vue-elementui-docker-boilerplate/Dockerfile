# 多阶段构建
# ①
FROM node:12-alpine as builder

WORKDIR /code

ADD . /code

RUN npm install --registry=https://registry.npm.taobao.org/ && npm run build


# ②
FROM nginx:alpine

COPY --from=builder /code/dist /usr/share/nginx/html
