#!/bin/bash
# this file get triggered automatically on heroku
echo "Starting the server"

echo "Installing server"
cd src/server
npm install

echo "Starting Server"
node dist/index.js

echo "Started server"

# Deploy locally:
# - client: src/client -> npm start
# - server: src/server -> tsc -> deploy .vscode debugger (.env file should point to heroku DB)

# Deploy to heroku:
# - login to heroku: heroku login
# - run: sh deploy.sh