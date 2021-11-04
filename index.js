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
  
    if (!(req.body && req.body.id)) {
      return res.status(404).send({
        error: req.body
      });
    }
    const id = req.body.id.replace(/[^a-zA-Z0-9]/g, '').trim();
    if (!(id && id.length)) {
      return res.status(404).send({
        error: 'Empty ID'
      });
    }

    let accessToken = "empty"
    
    // TODO: req.header (read cookie, use cookie to read from
    // firestore, )
    await firestore.collection(COLLECTION_NAME)
    .doc(id)
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
      accessToken = data;
    }).catch(err => {
      console.error(err);
      return res.status(404).send({
        error: 'Unable to retrieve the document',
      });
    });

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
