const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, TOKEN, LIMIT, COUNT} = require(`./system`);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}`);
  console.log(` Servers ${client.guilds.size}`);
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
