#!/bin/bash

# give permission to the files inside /secure_docs directory

sudo chmod -R 777 /var/www/staging

# navigate into current working directory

cd /var/www/staging

# install node modules

# npm install

# start our node app in the background using pm2

sudo git pull
sudo pm2 restart "backend-staging"