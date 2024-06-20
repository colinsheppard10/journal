#!
cd src/client
npm install
npm run build

cd ../server && npm run build

cd ../../ && git add *
echo \"`date`\" | xargs git commit -m

git push origin 
git push heroku main