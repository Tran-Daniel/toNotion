// requests.js
// REQUESTS CLASS

let dotenv = require("dotenv");
const fetch = require("node-fetch");
const { Client } = require("@notionhq/client");
dotenv.config();
const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function createPage(id) {
  const response = await notion.pages.create({
    parent: {
      page_id: id,
    },
    properties: {
      Name: {
        type: "title",
        title: [
          {
            type: "text",
            text: {
              content: "Test Page 😳",
            },
          },
        ],
      },
    },
    children: [
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          text: [
            {
              type: "text",
              text: {
                content:
                  "You made this page using the Notion API. 😳 Pretty cool, huh? We hope you enjoy building with us.",
              },
            },
          ],
        },
      },
    ],
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
  var childrenBlocks = [
    {
      object: "block",
      type: "heading_2",
      heading_2: {
        text: [
          {
            type: "text",
            text: {
              content: "Lacinato kale",
            },
          },
        ],
      },
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        text: [
          {
            type: "text",
            text: {
              content:
                "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
              link: {
                url: "https://en.wikipedia.org/wiki/Lacinato_kale",
              },
            },
          },
        ],
      },
    },
  ];

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
