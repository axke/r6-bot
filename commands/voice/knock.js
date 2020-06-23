const Commando = require('discord.js-commando'),
    {
        RichEmbed
    } = require('discord.js'),
    util = require('../../utils'),
    moment = require('moment');

module.exports = class KnockCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'knock',
            aliases: [],
            group: 'voice',
            memberName: 'knock',
            description: 'knock',
            examples: ['knock'],
        });
    }

    async run(message) {
        if (message.member.voiceChannel) {
            const vc = message.member.voiceChannel;
			console.log('chat');
            vc.join().then(
                connection => {
					console.log('joined');
                    try {
						console.log('dir name below')
						console.log(__dirname);
                        const dispatcher = connection.playFile(`${__dirname}/../../assets/mp3/knocking.mp3`);
                        dispatcher.on('end', end => {
                            vc.leave();
                        });
                    }
                    catch(err) {
                        message.reply(`Error: ${err}`);
                        vc.leave();
                    }
                }
            ).catch(e => {
				console.error('error!', e);
			});
        } else {
            message.reply(`You must be in a voice channel to run this command.`);
        }
    }
};