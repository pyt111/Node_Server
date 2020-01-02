# Dockerfile
# 使用node做为镜像
FROM node:latest
# 设置容器的工作目录为该目录
WORKDIR /root/tt1

COPY package*.json ./

COPY . .
# 向外提供3000端口
EXPOSE 8088
# 容器创建完成后执行的命令
CMD ["node","/root/tt1/bin/www.js"]
