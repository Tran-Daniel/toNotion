/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

 const Firestore = require('@google-cloud/firestore');
 // Use your project ID here
 const PROJECTID = 'studious-bit-325802';
 const COLLECTION_NAME = 'jiggle-auth';

 const firestore = new Firestore({
   projectId: PROJECTID,
   timestampsInSnapshots: true
   // NOTE: Don't hardcode your project credentials here.
   // If you have to, export the following to your shell:
   //   GOOGLE_APPLICATION_CREDENTIALS=<path>
   // keyFilename: '/cred/cloud-functions-firestore-000000000000.json',
 });
 
let dotenv = require("dotenv");
const {
  appendBlock,
  createPage,
  readBlocks,
  formulateChildrenBlocks,
} = require("./requests");

// if .env file is located in root directory
dotenv.config();

exports.toNotion = async (req, res) => {

  // Echoing the req origin into the 'Access-Control-Allow-Origin' to enable credentialed cors
  res.set('Access-Control-Allow-Origin', req.get('origin'));
  res.set('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');

  } else if (req.method === 'POST') {
    // First check user's credentials
    let authorized = false;
    let accessToken = '';

    const cookies = req.headers.cookie?.split(';').reduce((res, item) => {
      const data = item.trim().split('=');
      return { ...res, [data[0]]: data[1] };
    }, {});
    const docId = cookies?.doc_id;
    
    if (docId && docId.length) {
      await firestore.collection(COLLECTION_NAME)
      .doc(docId)
      .get()
      .then(doc => {
        if (!(doc && doc.exists)) {
          return res.status(404).send({
            error: 'Unable to find the document'
          });
        }
        const data = doc.data();
        if (!data) {
          return res.status(404).send({
            error: 'Found document is empty'
          });
        }
        accessToken = data.accessToken;
        authorized = true;
      }).catch(err => {
        console.error(err);
        return res.status(404).send({
          error: 'Unable to retrieve the document',
        });
      });
    }

    if (!authorized) {
      return res.status(401).send({
        error: 'Not authorized',
      })
    }

    if (!('text' in req.body)) {
      req.body.text = "No value for text found in req"
    }
    if (!('title' in req.body)) {
      req.body.title = "Default Test Title"
    }
    if (!('header' in req.body)) {
      req.body.header = "Default Test Header"
    }
    if (!('parentPageID' in req.body)) {
      req.body.parentPageID = process.env.PAGE_ID
    }
  
    let info = [
      {
        blockType: "heading_2",
        content: req.body.header,
      },
      {
        blockType: "paragraph",
        content: req.body.text,
      },
    ];

    page = await createPage(req.body.parentPageID, req.body.title);
    childrenBlocks = formulateChildrenBlocks(info);
    appendBlock(page.id, childrenBlocks);
  
    let message = {
      newPageID: page.id,
      info: info,
      accessToken: accessToken
    }
  
    res.status(200).send(message);

  } else {

    res.status(404).send({
      error: 'Unknown Request Type'
    })

  }
};
