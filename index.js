//Base bot discord :
const Discord = require('discord.js');

const client = new Discord.Client();

//Variables :

var prefix = "/";

//Login + connexion du bot :
client.login(process.env.TOKEN);

client.on("ready", () => {
	console.log("Connexion en cours ...");
    	setInterval(function() {

        	var statut = [
          	`/help for help`, 
          	`-Océ Gacha Bot- By FilEeaZaiR`,
          	`${client.users.size} users`];
    
        	var random = Math.floor(Math.random()*(statut.length));
    
        	client.user.setPresence({ 
            		game: { 
            		name: statut[random],
            		type: 0
          		}
        	});
      }, 30000); 
});

client.on("guildMemberAdd", member => {

    const logs = member.guild.channels.find(m => m.id === "568450523028652062");
    if (!logs) return;

    logs.send({
        embed: {
            color: 0xFE6F01,
            author: {
                name: member.user.tag,
                icon_url: member.user.displayAvatarURL
            },
            title: "Arrivée d'un nouvel utilisateur",
            fields: [
            {
                name: "Un nouvel utilisateur vient d'arriver",
                value: `Il s'agit de [${member.user.tag}]`,
                inline: true
            },
            {
                name: `Nombre de membres après l'arrivée de __${member.user.tag}__`,
                value: member.guild.memberCount,
                inline: false
            }],
            timestamp: new Date(),
            footer: {
                text: `ID : ${member.user.id} | FilEeaZaiR#1258`,
            }
        }
    });
});

client.on("guildMemberRemove", member => {

    const logs = member.guild.channels.find(m => m.id === "568450523028652062");
    if (!logs) return;
	
    logs.send({embed: {
            color: 0xFE6F01,
            author: {
                name: member.user.tag,
                icon_url: member.user.displayAvatarURL
            },
            title: "Départ d'un utilisateur",
	    image: {
		    url: "http://www.lesaffaires.com/uploads/images/normal/578f645f2123b12d0257dfa1fbdb8fff.jpg"
	    },
	    thumbnail: {
                        url: member.user.displayAvatarURL
            },
            fields: [
            {
                name: "Un utilisateur vient de partir",
                value: `Il s'agit de [${member.user.tag}]`,
                inline: true
            },
            {
                name: `Nombre de membres après le départ de __${member.user.tag}__`,
                value: member.guild.memberCount,
                inline: false
            }],
            timestamp: new Date(),
            footer: {
                text: `ID : ${member.user.id} | FilEeaZaiR#1258`,
            }
        }
    });

});


client.on(`message`, message =>{
	if(message.content.startsWith(prefix + "purge") || message.content.startsWith(prefix + "clear")) {
		let myrole = message.guild.member(client.user).hasPermission("MANAGE_MESSAGES");
		let yourole = message.guild.member(message.author).hasPermission("MANAGE_MESSAGES");

		if (!myrole) {
			return message.channel.send(":no_entry:**Je n'ai pas les permissions nécessaires pour effacer un/des message(s)**");
		}

		if (!yourole) {
		return message.channel.send(":no_entry:**Vous n'avez pas les permissions nécessaires**");
		}

		var suppression = message.content.substr(7);
		if (suppression < 2 || suppression > 101) {
			return message.reply(":warning:**La valeur que vous avez entré est invalide, merci de choisir une valeur comprise entre 2 et 100**");
		}
		message.channel.bulkDelete(suppression, true).then(ok => {
			message.reply("**Suppression de " + "" + suppression + "" + " messages**")
			.then(message => setTimeout(function(){message.delete()}, 1000))
			.catch(err => console.log(err));
	
		})

	}
});