module.exports.run = (client, message, args, ) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!bUser) return message.channel.send("Je ne trouve pas cet utilisateur !");
    let bReaison = args.join(" ").slice(22);
    if (!message.member.hasPermission ("BAN_MEMBERS")) return message.channel.send("Tu n'as pas les permissions !");
    if (bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Cet utilisateur a des permissions égales ou supérieures au votres !");

    message.channel.send(`**BAN** : L'utilisateur ${bUser} a été banni par <@${message.author.id}>.`);

    message.guild.member(bUser).guildMember.ban();
 }
 
 module.exports.help = {
     name: "ban",
     description: "Ban une personne.",
     usage: '<mention> <raison>',
     permissions: true,
     isUserAdmin: true,
     args: true
 };