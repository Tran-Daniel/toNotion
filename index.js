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

  if (!('text' in req.body)) {
    req.body.text = "No value for text found in req"
  }

  if (!('title' in req.body)) {
    req.body.title = "Default Test Title"
  }

  let info = [
    {
      blockType: "heading_2",
      content: "Test Heading choo choooooo",
    },
    {
      blockType: "paragraph",
      content: req.body.text,
    },
  ];

  page = await createPage(process.env.PAGE_ID, req.body.title);
  // blocks = await readBlocks(page.id);

  childrenBlocks = formulateChildrenBlocks(info);
  appendBlock(page.id, childrenBlocks);

  let message = {
    pageID: page.id,
    info: info,
  };

  res.status(200).send(message);
};
