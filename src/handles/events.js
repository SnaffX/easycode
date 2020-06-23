const login = require("../structures/login.js")
const client = login.discord

//let commands = cmd.commands

client.on("ready",() => {
    console.log(`[ API INFO ] Aplicação Logada via Token. Versão: 1.0`)
})

client.on("message",async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return ; 
    let cmd = require("../main.js")
    let commands = cmd.commands
  //  console.log("msg")
    let prefixo = "."
    if(!message.content.startsWith(prefixo)) return ;       
    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase(); 
    let args = messageArray.slice(1);
    const indice = commands.findIndex((user, index, array) => user.name == command)
    if(commands[indice]){
    if(commands[indice].permissions){ 
    if(message.member.roles.cache.get(commands[indice].permissions.roles[0])){
        if(commands[indice].msg.includes("~args[0]~")){
            message.channel.send(args.join(" "))
        }else{
            message.channel.send(commands[indice].msg)
        }
    }else{
        message.channel.send("Voce nao pode usar esse Comando!")
    }
    }else{
        if(commands[indice].msg.includes("~args[0]~")){
            message.channel.send(args.join(" "))
        }else{
            message.channel.send(commands[indice].msg)
        }
    }
    }
})
