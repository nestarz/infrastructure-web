const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(cors())

const { mapping } = require('./mapping');
const { whois, whoisTlds, allTlds, whoisIps } = require('./whois');

app.post('/mapping', cors(), mapping);
app.post('/whois', cors(), whois);
app.post('/whoisTlds', cors(), whoisTlds);
app.post('/whoisIps', cors(), whoisIps);
app.get('/allTlds', cors(), allTlds);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})