/*if(message.guild.me.voice.channel.id != message.member.voice.channel.id) return message.channel.send("**Voce nao está no mesmo canal que eu**")
if(!tracks[0]) return message.channel.send("Nao encontrei essa Musica :[")
if (loadType === 'SEARCH_RESULT' || loadType === 'TRACK_LOADED') {
tracks[0].info.requester = message.author
tracks[0].info.thumbnail = `https://img.youtube.com/vi/${tracks[0].info.identifier}/hqdefault.jpg`
if(player.queue.length >= 200) return message.channel.send('A fila está cheia.')
player.queue.add(tracks[0])
if(!player.playing) {
  message.channel.send(` Iniciando a Musica: **${tracks[0].info.title}**`);    
}else{
  message.channel.send(`Musica Adicionada a Fila: **${tracks[0].info.title}**`);    
}      
}
if (!player.playing) return player.play()
*/