
module.exports = class {

    constructor(token){
        this.token = token;
        this.isValidToken = false;
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

    verifyToken = async () =>{

        //Return false if token doesn't exist
        if(!this.token) return false;

        //Try make an empty request to verify if auth token is valid
        const isValid = await this._requestQuery();
        this.isValidToken = isValid.success;

        //Return response
        return isValid.success;
    }

    getOrganizations = async () => {

        //Verify if object contains a valid token
        if(this.isValidToken){

            //Use GraphQL to request information from organizations associated with the user token
            const res = await this._requestQuery(`
            {
                organizations {
                  id
                  name
                }
            }
            `);

            //Return data
            return res;

        }else{

            //Return a error if not exists a token or is invalid
            return {
                "success": false,
                "error": "Invalid token! Always use verifyToken() before anyone request."
            }

        }
    }

    getUserInfos = async () => {
        //Verify if object contains a valid token
        if(this.isValidToken){

            //Use GraphQL to request information from user associated with the token
            const res = await this._requestQuery(`
            {
                me {
                  id
                  username
                  name
                  email
                  avatarUrl
                  created_at
                  departmentKey
                  locale
                  timeZone 
                  }
            }
            `);

            //Return data
            return res;

        }else{

            //Return a error if not exists a token or is invalid
            return {
                "success": false,
                "error": "Invalid token! Always use verifyToken() before anyone request."
            }

        }
    }
}

