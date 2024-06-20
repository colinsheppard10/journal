#!/bin/bash
# this file get triggered automatically on heroku from Procfile
echo "Starting the server"
cd src/server
node dist/index.js
echo "Started server"

# Deploy locally:
# - client: src/client -> npm start
# - server: src/server -> tsc -> deploy .vscode debugger (.env file should point to heroku DB)

# Deploy to heroku:
# - login to heroku: heroku login
# - run: sh deploy.sh