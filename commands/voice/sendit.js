const Commando = require('discord.js-commando'),
    {
        RichEmbed
    } = require('discord.js'),
    util = require('../../utils'),
    moment = require('moment');
    ytdl = require('ytdl-core');

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
                    const streamOptions = { seek: 0, volume: 1 };
                    const stream = ytdl('https://www.youtube.com/watch?v=RZqlgKCOJzU', { filter : 'audioonly' });
                    const dispatcher = connection.playStream(stream, streamOptions);
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