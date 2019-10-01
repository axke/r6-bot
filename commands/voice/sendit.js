const Commando = require('discord.js-commando'),
    {
        RichEmbed
    } = require('discord.js'),
    util = require('../../utils'),
    moment = require('moment');

module.exports = class SendItCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'sendit',
            aliases: ['send'],
            group: 'voice',
            memberName: 'sendit',
            description: 'Still gonna send it',
            examples: ['sendit', 'send'],
        });
    }

    async run(message) {
        if (message.member.voiceChannel) {
            message.member.voiceChannel.join().then(
                connection => {
                    const dispatcher = connection.playArbitraryInput('https://www.youtube.com/watch?v=RZqlgKCOJzU');
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