const { createNestServer } = require('../dist/main');

module.exports = async (req, res) => {
  const server = await createNestServer();
  server(req, res);
};