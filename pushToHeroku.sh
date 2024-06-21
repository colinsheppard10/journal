#!
cd src/client
npm install
npm run build

cd ../server && npm run build

cd ../../ && git add *
echo \"`date`\" | xargs git commit -m

# Heroku auto deploys are connected to https://github.com/colinsheppard10/journal
git push origin 