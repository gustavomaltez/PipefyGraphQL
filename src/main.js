const express = require('express');
const bodyParser = require('body-parser');
const handleSimpleRequest = require('./utils')

const app = express();

app.use(bodyParser.json());

app.post('/account/infos', (req,res) => handleSimpleRequest(req,res,"infos"));

app.post('/account/organizations', (req,res) => handleSimpleRequest(req,res,"organizations"));

app.listen(3000);