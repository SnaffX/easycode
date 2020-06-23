const x = require("discord.js");
let commands = []
class Command {  
    constructor(options) {
      this.options = options;
     commands.push({name: `.${options.name}`,uso:this.options.uso})
    }
    send(msg){
      const test = commands.findIndex((user, index, array) => user.name == `.${this.options.name}`)
      commands[test].msg = msg;
    }
    permissions(permissio){
      const test = commands.findIndex((user, index, array) => user.name == `.${this.options.name}`)

      commands[test].permissions = permissio;
    }
}

module.exports = {
  Command,
  commands
};
