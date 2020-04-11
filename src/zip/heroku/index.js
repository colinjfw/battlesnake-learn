
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', (process.env.PORT || 9001))
app.enable('verbose errors')
app.use(bodyParser.json())

app.post("/start", (req, res) => {
  console.log("Received start", req.body)
  res.json(start(req.body))
})

app.post("/move", (req, res) => {
  console.log("Received move", req.body)
  res.json(move(req.body))
})

app.post("/ping", (req, res) => {
  console.log("Received ping", req.body)
})

app.post("/end", (req, res) => {
  console.log("Received end", req.body)
})

app.listen(app.get('port'), () => {
  console.log('Server listening on port %s', app.get('port'))
})
