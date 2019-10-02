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
            const vc = message.member.voiceChannel;
            vc.join().then(
                connection => {
                    try {
                        const dispatcher = connection.playFile(`${__dirname}/../../assets/mp3/sendit.mp3`);
                        dispatcher.on('end', end => {
                            vc.leave();
                        });
                    }
                    catch {
                        vc.leave();
                    }
                }
            )
        } else {
            message.reply(`You must be in a voice channel to run this command.`);
        }
};