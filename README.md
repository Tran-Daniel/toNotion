# toNotion

toNotion is an extension that takes text from site and brings it into Notion using Notion's API.

This repo contains the code that is being deployed to GC Functions.


## Deployment to GC Functions

Make sure you have [gcloud](https://cloud.google.com/sdk/docs) setup and this repo cloned.

To deploy, run 

```
gcloud init

// Login and navigate to the project

gcloud functions deploy sendToNotion --entry-point toNotion --runtime nodejs14
```

You will also need an .env file with the following values:
- COLOR
- TBA

## links

https://medium.com/google-cloud/debugging-node-google-cloud-functions-locally-in-vs-code-e6b912eb3f84
https://medium.com/developer-secrets/storing-credentials-the-right-way-78074ae21727

## License
[MIT](https://choosealicense.com/licenses/mit/)