const { Client, Collection } = require('discord.js');
const { TOKEN, PREFIX } = require('./config');
const { readdirSync } = require('fs');
const { time, timeStamp } = require('console');


const client = new Client();
["commands", "cooldowns"].forEach(x => client[x] = new Collection())

const loadCommands = (dir = "./commands/") => {
  readdirSync(dir).forEach(dirs => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

    for (const file of commands) {
      const getFileName = require(`${dir}/${dirs}/${file}`);
      client.commands.set(getFileName.help.name, getFileName)   
      console.log(`Commande chargée: ${getFileName.help.name}`);
    };
  });
};

loadCommands();

client.on('message', message => {
  if(!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;
  
  const command = client.commands.get(commandName);
  if(!command) return;


  if(command.help.permissions && !message.member.hasPermission('BAN_MEMBERS')) return message.reply("Tu n'as pas les permissions pour utiliser cette commande !");

  if (command.help.args && !args.length) {
    let noArgsReply = `La commande est incomplète, ${message.author} !`;

    if (command.help.usage) noArgsReply += `\nVoici comment utiliser la commande : \`${PREFIX}${command.help.name} ${command.help.usage}\``;

    return message.channel.send(noArgsReply)
  }


  command.run(client, message, args);
});
  


client.on('ready', () => { console.log(`Le bot est en ligne!`) });
client.login(TOKEN);