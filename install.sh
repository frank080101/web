#!/bin/bash
wget https://nodejs.org/dist/v16.17.0/node-v16.17.0-linux-x64.tar.xz
tar -xvf node-v16.17.0-linux-x64.tar.xz
sudo mv node-v16.17.0-linux-x64 /usr/node-js

sudo ln -s /usr/node-js/bin/node /usr/local/bin/
sudo ln -s /usr/node-js/bin/npm /usr/local/bin/

sudo npm install -g yarn
sudo npm install -g umi
sudo ln -s /usr/node-js/bin/umi /usr/local/bin/
sudo ln -s /usr/node-js/bin/yarn /usr/local/bin/
sudo ln -s /usr/node-js/bin/yarnpkg /usr/local/bin/

sudo npm install --save react-scripts --registry=https://registry.npm.taobao.org