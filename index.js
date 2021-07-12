/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
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

  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
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
    };
  
    res.status(200).send(message);
  }
};
