/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
let dotenv = require("dotenv");
const fetch = require("node-fetch");

// if .env file is located in root directory
dotenv.config();



exports.toNotion = (req, res) => {
  req.body = {
    color: process.env.COLOR,
  };

  let message = {
    color: req.body.color,
    "default message": "Hello my world!",
  };
  res.status(200).send(message);

  // TO DO : Figure out how to post blocks/content to page??
  // createPage();
  // postPage();
};

function createPage() {
  const data = {
    parent: { page_id : process.env.PAGE_ID},
    properties: {
      Name: {
        title: [
          {
            type: "text",
            text: {
              content: "testText Hello !",
            },
          },
        ],
      },
    },
  };

  fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
      Authorization: process.env.NOTION_API_KEY,
      "Notion-Version": "2021-05-13",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    });
}

function postPage() {
  const data = {
    parent: { database_id: process.env.DATABASE_ID },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: "toNotion testststtststs",
            },
          },
        ],
      },
    },
  };

  fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
      Authorization: process.env.NOTION_API_KEY,
      "Notion-Version": "2021-05-13",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    });
}