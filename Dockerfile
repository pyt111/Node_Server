# Dockerfile
# 使用alpine做为镜像
 FROM alpine AS builder
# 设置容器的工作目录为该目录
WORKDIR /root/tt1
RUN apk add --no-cache --update nodejs nodejs-npm
COPY package*.json ./
RUN npm install --production


FROM alpine
WORKDIR /root/tt1
RUN apk add --no-cache --update nodejs nodejs-np
COPY --from=builder /root/tt1/node_modules ./node_modules
COPY . .

# 向外提供3000端口
EXPOSE 8088
# 容器创建完成后执行的命令
CMD ["npm","start"]
