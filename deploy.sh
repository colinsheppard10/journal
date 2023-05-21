#!/bin/bash
# this file get triggered automatically on heroku
echo "Starting the server"

echo "Installing server"
cd src/server
npm install

echo "Starting Server"
node dist/index.js

echo "Started server"