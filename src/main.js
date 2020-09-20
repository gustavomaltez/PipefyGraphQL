const express = require('express');
const bodyParser = require('body-parser');
const pipefyBridge = require('./pipefy');

const app = express();
app.use(bodyParser.json());

app.post('/account/infos', (req,res) => {
    
    //Deconstruct access token
    const { token } = req.body;

    //Verify if exists a token in body request
    if(!token) res.status(400).json({"error": "No token identified"});

    //Create a new pipefy bridge
    const pipefy = new pipefyBridge(token);

    // ...
    return res.json({"example": 123})
})

app.listen(3000);