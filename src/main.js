require("./handles/events.js")
require("./cache/cache")
let oauth2 = require('./structures/login.js')
let Command = require('./structures/command.js')
let music = require('./structures/music.js')
let musicx = require('./handles/music.js')
let sockets = require("./configs/sockets.js")
let painel = require("./painel/painel")
module.exports = {
configs: sockets.configs,
io: sockets.io,

oauth2:oauth2.oauth2,
Command: Command.Command,
commands: Command.commands,
client: oauth2.discord,
connect: musicx.Sound,
lavalink: musicx.lavalink,

play: music.play,
pausar: music.pausar,
continuar: music.continuar,
pular: music.pular,
getTracks: music.getTracks,
volume: music.volume,
fim: music.fim,

Painel: painel.Painel,
Eventos: sockets.io,
}