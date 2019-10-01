const Commando = require('discord.js-commando'),
    {
        RichEmbed
    } = require('discord.js'),
    util = require('../../utils'),
    moment = require('moment');

module.exports = class GSOKCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'gsok',
            aliases: ['shiton', 'shit'],
            group: 'voice',
            memberName: 'gsok',
            description: 'Get shit on kids',
            examples: ['shit', 'gsok', 'shiton'],
        });
    }

    async run(message) {
        if (message.member.voiceChannel) {
            message.member.voiceChannel.join().then(
                connection => {
                    const dispatcher = connection.playFile(`${__dirname}/../../assets/mp3/gsok.mp3`);
                    dispatcher.on('end', end => {
                        message.member.voiceChannel.leave();
                    });
                }
            )
        } else {
            message.reply(`You must be in a voice channel to run this command.`);
        }
    }
};