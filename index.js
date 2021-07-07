/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
let dotenv = require("dotenv");
const { appendBlock, createPage, readBlocks, formulateChildrenBlocks} = require("./requests");

// if .env file is located in root directory
dotenv.config();

exports.toNotion = async (req, res) => {
  req.body = {
    color: process.env.COLOR,
  };

  let message = {
    color: req.body.color,
    "default message": "Hello my world!",
  };
  res.status(200).send(message);

  let info = [{
    blockType : "paragraph",
    content : "test content from Mista Daniel Tran"
  },
  {
    blockType : "heading_2",
    content : "Test Heading choo choooooo"
  }];

  

  page = await createPage(process.env.PAGE_ID);
  // blocks = await readBlocks(page.id);

  childrenBlocks = formulateChildrenBlocks(info);
  console.log(childrenBlocks);
  appendBlock(page.id, childrenBlocks);
  console.log("Hello");
};