#Migrating content from development to master

###Dependecies
Make sure you have Contentful-cli installed (and set-up)
Contentful CLI installation and usage:- https://github.com/contentful/contentful-cli

set-up an .env file with:
spaceId=`<space id>`
accessToken=`<contentful access token>`

To migrate content from Contentful development environment to master use the following commands:

```
npm run install
npm run build
migrate-content (use npm link & then migate-content if the migrate-content command doesn't work)
```