// requests.js
// REQUESTS CLASS

let dotenv = require("dotenv");
const fetch = require("node-fetch");
const { Client } = require("@notionhq/client");
dotenv.config();
const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function createPage(id, titleName) {
  const response = await notion.pages.create({
    parent: {
      page_id: id,
    },
    properties: {
      Name: {
        type: 'title',
        title: [
          {
            type: 'text',
            text: {
              content: titleName,
            },
          },
        ],
      },
    },

    children: [],
  });
  console.log(response);
  return response;
}

async function readBlocks(id) {
  const blockId = id;
  const response = await notion.blocks.children.list({
    block_id: blockId,
  });
  console.log(response);
  return response;
}

function formulateChildrenBlocks(info) {
  var childrenBlocks = [];

  for (let i = 0; i < info.length; i++) {
    childrenBlocks.push(createBlock(info[i].blockType, info[i].content));
  }
  return childrenBlocks;
}

function createBlock(blockType, content) {
  var entry = {};
  entry.object = "block";
  entry.type = blockType;
  entry[blockType] = createText(content);
  return entry;
}

function createText(content) {
  var ret = {};
  var textRet = [];
  var text = {};
  var textContent = {};

  textContent.content = content;

  text.type = "text";
  text.text = textContent;

  textRet.push(text);
  ret.text = textRet;
  return ret;
}

async function appendBlock(id, childrenBlocks) {
  const blockId = id;
  const response = await notion.blocks.children.append({
    block_id: blockId,
    children: childrenBlocks,
  });
  console.log(response);
  return response;
}

module.exports = { appendBlock, createPage, readBlocks, formulateChildrenBlocks };
