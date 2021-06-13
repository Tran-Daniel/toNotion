/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.toNotion = (req, res) => {
  let message = {
    "query" : req.query,
    "request" : req.body,
    "default message": 'Hello my world!'
  };
  res.status(200).send(message);
};
