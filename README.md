# toNotion

toNotion is an extension that takes text from site and brings it into Notion using Notion's API.

This repo contains the code that is being deployed to GC Functions.

## Current Requirements for Requests

Body should look like

{
    "text" : "YOUR TEXT HERE",
    "title" : "YOUR TITLE HERE"
}

All pages are being made within a private page right now.

Eventually, page_id will be included in body as well as api key.

## Deployment to GC Functions

Make sure you have [gcloud](https://cloud.google.com/sdk/docs) setup and this repo cloned.

To deploy, run 

```
gcloud init

// Login and navigate to the project

gcloud functions deploy sendToNotion --entry-point toNotion --runtime nodejs14
```

You will also need an .env file with the following values:
- NOTION_API_KEY
- DATABASE_ID
- PAGE_ID

## links

https://medium.com/google-cloud/debugging-node-google-cloud-functions-locally-in-vs-code-e6b912eb3f84
node --inspect node_modules/@google-cloud/functions-framework --target=toNotion

https://medium.com/developer-secrets/storing-credentials-the-right-way-78074ae21727

https://www.notion.so/my-integrations/internal/063b1b2f8e0546789dfcf20329384fea


## To Do:

Make requests.js more generic

BUG: title not working (untitled)

## License
[MIT](https://choosealicense.com/licenses/mit/)

