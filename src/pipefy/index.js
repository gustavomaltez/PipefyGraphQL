
module.exports = class {
    
    constructor(token){
        this.token = token;
        this.isValidToken = false;
        this._verifyToken(); //This function will be auto started when object has been created
    }

    _requestQuery = async (query = '') => {

        try {

            //Import axios
            const axios = require("axios")

            //Make request with GraphQL params
            const res = await axios({
                url: 'https://app.pipefy.com/queries',
                method: 'post',
                headers: { Authorization: "Bearer " + this.token},
                data: { query }
            })

            //Return data
            return {
                "success": true,
                ...res.data
            }

        } catch (error) {

            return {
                "success": false,
                "statusCode": error.response.status,
                ...error.response.data
            }

        }    
    }

    _verifyToken = async () =>{

        //Return if token doesn't exist
        if(!this.token) return;

        //Try make an empty request to verify if auth token is valid
        const isValid = await this._requestQuery();
        this.isValidToken = isValid.success;
    }
}

