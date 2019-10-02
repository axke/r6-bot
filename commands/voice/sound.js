const Commando = require('discord.js-commando'),
    {
        RichEmbed
    } = require('discord.js'),
    util = require('../../utils'),
    moment = require('moment');

module.exports = class SoundCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'sound',
            aliases: [],
            group: 'voice',
            memberName: 'sound',
            description: 'Plays sound clip',
            examples: ['sound {soundName}'],
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