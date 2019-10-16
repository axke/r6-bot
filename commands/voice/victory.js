const Commando = require('discord.js-commando'),
    {
        RichEmbed
    } = require('discord.js'),
    util = require('../../utils'),
    moment = require('moment');

module.exports = class VictoryCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'victory',
            aliases: ['screech'],
            group: 'voice',
            memberName: 'victory',
            description: 'Still gonna send it',
            examples: ['victory', 'screech'],
        });
    }

    async run(message) {
        if (message.member.voiceChannel) {
            const vc = message.member.voiceChannel;
            vc.join().then(
                connection => {
                    try {
                        const dispatcher = connection.playFile(`${__dirname}/../../assets/mp3/victory.mp3`);
                        dispatcher.on('end', end => {
                            vc.leave();
                        });
                    }
                    catch(err) {
                        message.reply(`Error: ${err}`);
                        vc.leave();
                    }
                }
            )
        } else {
            message.reply(`You must be in a voice channel to run this command.`);
        }
    }
};