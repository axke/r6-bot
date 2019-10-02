const Commando = require('discord.js-commando'),
    {
        RichEmbed
    } = require('discord.js'),
    util = require('../../utils'),
    moment = require('moment');

module.exports = class VoiceCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'voice',
            aliases: ['voice', 'sound'],
            group: 'voice',
            memberName: 'voice',
            description: 'Plays voice clip',
            examples: ['voice {sound}', 'sound {sound}'],
            args: [{
                key: 'sound',
                prompt: 'What sound do you want played?',
                type: 'string',
            },]
        });
    }

    async run(message, { sound }) {
        if (message.member.voiceChannel) {
            const vc = message.member.voiceChannel;
            vc.join().then(
                connection => {
                    try {
                        const dispatcher = connection.playFile(`${__dirname}/../../assets/mp3/${sound}.mp3`);
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
    }
};