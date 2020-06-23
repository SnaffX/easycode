let lavalink = null;

function Sound(client){
lavalink = client;
//console.log(lavalink)
require("../handles/lava.js")
}
module.exports = {
    Sound,
    lavalink
};