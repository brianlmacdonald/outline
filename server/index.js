const express = require('express')
const morgan = require('morgan')
const routes = require('./routes')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 1337
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api', routes)

app.use((error, req, res, next) => {
  res.json({error: error.message})
})

app.listen(PORT, () => {
  console.log(`listening on ${PORT} and running in:`, process.env.NODE_ENV)
})