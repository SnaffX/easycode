class Painel {
    constructor(api_key) {
        this.api_key = api_key     

        const socket = require("../configs/sockets.js")
        const io = socket.io

        io.emit('oauth',{
        api_key:api_key,
        })
        io.on("oauth1",response =>{
            console.log(response)
        })
    }
}
module.exports = {
    Painel
}
