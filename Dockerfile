# Dockerfile
# 使用node做为镜像
FROM node:latest
# 设置容器的工作目录为该目录
WORKDIR /root/node_server

COPY package*.json ./
RUN npm install

COPY . .
# 向外提供3000端口
EXPOSE 8080
# 容器创建完成后执行的命令
CMD ["node","/root/node_server/bin/www.js"]
