const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, TOKEN, LIMIT, COUNT} = require(`./system`);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}`);
  console.log(` Servers ${client.guilds.size}`);
});

 const developers = ["441584713799303183"]
client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!developers.includes(message.author.id)) return;
      
  if (message.content.startsWith(adminprefix + 'p')) {
    client.user.setGame(argresult);
      message.channel.send(`**Done ${argresult}**`)
  } else 
  if (message.content.startsWith(adminprefix + 'offline')) {
  client.user.setStatus("offline");
      message.channel.send(`**Done**`)
} else
if (message.content.startsWith(adminprefix + 'setava')) {
  client.user.setAvatar(argresult);
    message.channel.send(`Changing The Avatar To :**${argresult}** `);
}
});

client.on('message', async message => {

  let messageArray = message.content.split(/\s+/g);
	let args = messageArray.slice(1);

	if(message.content.startsWith(`x`)) {
	if(message.author.id !== client.user.id) return;
	let messagecount = parseInt(args[0], 10) ? parseInt(args[0], 10) : COUNT;
	message.channel.fetchMessages({limit: LIMIT})
	.then(messages => {
	let msg_array = messages.array();
	msg_array = msg_array.filter(m => m.author.id === client.user.id);
	msg_array.length = messagecount + 1;
	msg_array.map(m => m.delete().catch(console.error));
	});
	message.channel.send(`${messagecount} : عدد الرسائل التي تم مسحها`, {code: 'js'}).then(m => m.delete(3000));
	};
});

client.login(process.env.LIGHT);
