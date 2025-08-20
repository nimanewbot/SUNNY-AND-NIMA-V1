FROM node:lts-buster
RUN git clone https://github.com/nimanew3031/SUNNY-AND-NIMA-V1.git
WORKDIR /root/SUNNY-AND-NIMA-V1 
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1
COPY . .
EXPOSE 9090
CMD ["npm", "start"]
