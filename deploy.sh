#!/bin/bash
# this file get triggered automatically on heroku from Procfile
echo "Starting the server"
cd src/server
npm install
node dist/index.js
echo "Started server"

# Deploy locally:
# - client: src/client -> npm start
# - server: src/server/.vscode should work (add .env file pointing to heroku DB)
# - - (src/server -> npx tsc -> "${workspaceFolder}/dist/index.js" )

# Manually Deploy on heroku:
# - login to heroku: heroku login
# - run: sh deploy.sh

# Useful commands: 
# - tail heroku logs: heroku logs --tail --app bluebird-journal