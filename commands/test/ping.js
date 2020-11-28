module.exports.run = (client, message,) => {
   message.channel.send("Pong !") 
}

module.exports.help = {
    name: "ping",
    description: "Renvoie pong.",
    usage: '<rien>',
    permissions: false,
    args: false
};