/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
 let dotenv = require('dotenv');

 // if .env file is located in root directory
 dotenv.config()

exports.toNotion = (req, res) => {

  req.body = {
    "color" : process.env.COLOR
  }

  let message = {
    "color" : req.body.color,
    "default message": 'Hello my world!'
  };
  res.status(200).send(message);
  
};
