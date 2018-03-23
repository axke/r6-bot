const Commando = require('discord.js-commando'),
    {RichEmbed} = require('discord.js'),
    util = require('./../../utils'),
    moment = require('moment');

module.exports = class RankCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'rank',
            aliases: [''],
            group: 'players',
            memberName: 'rank',
            description: 'Get user rank',
            examples: ['rank AxKe.'],
            args: [
                {
                    key: 'name',
                    prompt: 'What is the name of the user?',
                    type: 'string',
                },
                {
                    key: 'region',
                    prompt: 'What region do you want to look up?',
                    type: 'string',
                    validate: text => {
                        const v = ['na', 'eu', 'as'];
                        if (v.includes(text.toLowerCase())) return true;
                        return `Possible regions are: ${v.toString()}`;
                    },
                    default: 'na'
                },
                {
                    key: 'platform',
                    prompt: 'What platform do you want the ranking for?',
                    type: 'string',
                    validate: text => {
                        const v = ['ps4', 'pc', 'xbox'];
                        if (v.includes(text.toLowerCase())) return true;
                        return `Possible regions are: ${v.toString()}`;
                    },
                    default: 'pc',
                },
            ],
        });
    }

    async run(message, {name, region, platform}) {
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
            .setDescription(`Players rank in NA for the current season`);
        const currentSeasonNA = details.rank.ncsa;
        const ranks = util.ranks;
        // Rank
        embed.addField(`Rank`, `Current: ${ranks[currentSeasonNA.rank]}\nBest: ${ranks[currentSeasonNA.max_rank]}`, true);
        embed.addField(`Stats`, `Wins: ${currentSeasonNA.wins} || Loss: ${currentSeasonNA.losses}\nWin Percent: ${Math.floor((currentSeasonNA.wins / (currentSeasonNA.wins + currentSeasonNA.losses) * 100))}%`, true);
        const thumb = `https://r6db.com/sprite.svg#${currentSeasonNA.rank}-usage`;
        console.log(thumb);
        embed.setThumbnail(thumb);
        return embed;
    }
};