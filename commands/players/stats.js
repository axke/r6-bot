const Commando = require('discord.js-commando'),
    {RichEmbed} = require('discord.js'),
    util = require('./../../utils'),
    moment = require('moment');

module.exports = class StatsCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'stats',
            aliases: [],
            group: 'players',
            memberName: 'stats',
            description: 'Get user stats',
            examples: ['stats AxKe.'],
            args: [
                {
                    key: 'name',
                    prompt: 'What is the name of the user?',
                    type: 'string',
                }
            ],
        });
    }

    async run(message, {name}) {
        const users = await util.request.r6dbAPI(`https://r6db.com/api/v2/players?name=${name}&platform=PC`);
        console.log('users!');
        let userId = '';
        if (users && users.length > 0) {
            console.log('users', users);
            for (let i in users) {
                let user = users[i];
                if (user.name.toLowerCase() == name.toLowerCase()) {
                    userId = user.userId;
                    break;
                }
            }
            console.log('uid', userId);
            if (userId.length > 0) {
                let uri = `https://r6db.com/api/v2/players/${userId}?platform=PC&update=false`;
                console.log(uri);
                const userDetails = await util.request.r6dbAPI(uri);
                return message.embed(this.createEmbed(userDetails));
            }
        }
    }

    createEmbed(details) {
        let embed = new RichEmbed()
            .setAuthor(`${details.name}`, `http://uplay-avatars.s3.amazonaws.com/${details.userId}/default_146_146.png`, `https://r6db.com/player/${details.userId}`)
            .setTimestamp()
            .setDescription(`General Stats for player`);
        const stats = details.stats;
        embed.addField(`Kills`,
            `Kills: ${stats.general.kills} Deaths: ${stats.general.deaths} Assists: ${stats.general.assists}\n` +
            `KD: ${(stats.general.kills / stats.general.deaths).toFixed(2)}\n` +
            `Accuracy: ${(stats.general.bulletsFired / stats.general.bulletsHit).toFixed(2)}\n`+
            `Headshots: ${stats.general.headshot} Headshot Rate: ${(stats.general.headshot / stats.general.kills).toFixed(2)}%\n`,
            `Penetration: ${stats.general.penetrationKills} Blind: ${stats.general.blindKills} Melee: ${stats.general.meleeKills}\n`,
            false);

        embed.addField(`Wins`,
            `Wins: ${stats.general.won} Loss: ${stats.general.lost} Time: ${(stats.custom.timePlayed / 60 / 60).toFixed(2)}` +
            `\nWinrate: ${(stats.general.won / (stats.general.won + stats.general.lost)).toFixed(2)}%`,
            false);

        embed.addField(`Best`,
            `Bomb - Score: ${stats.bomb.bestScore} Wins: ${stats.bomb.won} Loss: ${stats.bomb.lost} Winrate: ${(stats.bomb.won / (stats.bomb.won + stats.bomb.lost)).toFixed(2)}%\n` +
            `Secure - Score: ${stats.secure.bestScore} Wins: ${stats.secure.won} Loss: ${stats.secure.lost} Winrate: ${(stats.secure.won / (stats.secure.won + stats.secure.lost)).toFixed(2)}%\n` +
            `Hostage - Score: ${stats.hostage.bestScore} Wins: ${stats.hostage.won} Loss: ${stats.hostage.lost} Winrate: ${(stats.hostage.won / (stats.hostage.won + stats.hostage.lost)).toFixed(2)}%\n`,
            true);
        /*const thumb = `https://r6db.com/sprite.svg#${currentSeasonNA.rank}-usage`;
        embed.setThumbnail(thumb);*/
        return embed;
    }
};