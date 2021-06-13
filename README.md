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

## License
[MIT](https://choosealicense.com/licenses/mit/)