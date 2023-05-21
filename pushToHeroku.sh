#!
# TODO: for now just using the dev server
# cd src/client
# npm run build

cd src/client
npm run build

cd ../server && tsc

cd ../../ && git add *
echo \"`date`\" | xargs git commit -m

git push origin 
git push heroku main