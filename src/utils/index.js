const pipefyBridge = require('../pipefy');

module.exports = handleSimpleRequest = (req,res,type) => {

    //Deconstruct access token
    const { token } = req.body;

    //Verify if exists a token in body request
    if(!token) res.status(400).json({"error": "No token identified"});

    //Shows an error if type does not exists
    if(!type) throw new Error("Expected type of request on function handleSimpleRequest()");

    //Create a new pipefy bridge
    const pipefy = new pipefyBridge(token);

    //Verify if token is valid
    pipefy.verifyToken().then((isValid) => {

        //Return a error if token is invalid
        if(!isValid) return res.json({"error": "Invalid token!"});

        //Define the patterns to make request on pipefy api
        const pattern = {
            "infos": pipefy.getUserInfos(),
            "organizations": pipefy.getOrganizations(),
        }

        //If token is valid, return user infos
        pattern[type].then((data) => {
            return res.json(data)
        })
    })
}
