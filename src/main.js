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

    //Verify if token is valid
    pipefy.verifyToken().then((isValid) => {

        //Return a error if token is invalid
        if(!isValid) return res.json({"error": "Invalid token!"});

        //If token is valid, return user infos
        pipefy.getUserInfos().then((data) => {
            return res.json(data)
        })
    })
})

app.post('/account/organizations', (req,res) => {

    //Deconstruct access token
    const { token } = req.body;

    //Verify if exists a token in body request
    if(!token) res.status(400).json({"error": "No token identified"});

    //Create a new pipefy bridge
    const pipefy = new pipefyBridge(token);

    //Verify if token is valid
    pipefy.verifyToken().then((isValid) => {

        //Return a error if token is invalid
        if(!isValid) return res.json({"error": "Invalid token!"});

        //If token is valid, return all organization infos
        pipefy.getOrganizations().then((data) => {
            return res.json(data)
        })
    })

})

app.listen(3000);