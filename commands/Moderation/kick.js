const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!bUser) return message.channel.send("Je ne trouve pas cet utilisateur !");
    let bReaison = (args.join(" ").slice(22) || 'Aucune raison spécifiée !');
    if (!message.member.hasPermission ("KICK_MEMBERS")) return message.channel.send("Tu n'as pas les permissions !");
    if (bUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Cet utilisateur a des permissions égales ou supérieures au votres !");

    message.channel.send(`**KICK** : L'utilisateur ${bUser} a été kick par <@${message.author.id}>.`);

    message.guild.member(bUser).kick(bReaison);

    const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`)
    .setColor("#00A6FF")
    .setDescription(`**Action** : kick\n**Raison** : ${bReaison}`)
    .setThumbnail(user.avatarURL())
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL())

    
 };
 
 module.exports.help = {
     name: "kick",
     description: "Expulse une personne.",
     usage: '<mention> <raison>',
     permissions: true,
     isUserAdmin: true,
     args: true
 };