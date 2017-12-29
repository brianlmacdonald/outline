const https = require('https')
const PORT = process.env.PORT || 1337

const options = {}

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('done.')
  console.log(`listening on ${PORT}!`)
}).listen(PORT)

