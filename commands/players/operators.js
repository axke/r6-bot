const Commando = require('discord.js-commando'),
    {RichEmbed} = require('discord.js'),
    util = require('./../../utils'),
    moment = require('moment');

module.exports = class OperatorsCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'operators',
            aliases: ['ops'],
            group: 'players',
            memberName: 'operators',
            description: 'Get user operator stats',
            examples: ['operators AxKe.'],
            args: [
                {
                    key: 'name',
                    prompt: 'What is the name of the user?',
                    type: 'string',
                },
                {
                    key: 'stat',
                    prompt: 'What stat would you like it sorted by?',
                    type: 'string',
                    validate: text => {
                        const v = ['time', 'kills', 'wins','kd','winrate'];
                        if (v.includes(text.toLowerCase())) return true;
                        return `Possible stats are: ${v.toString()}`;
                    },
                    default: 'time',
                },
                {
                    key: 'count',
                    prompt: 'How many operators would you like returned?',
                    type: 'string',
                    validate: text => {
                        if (!isNaN(text)) return true;
                        return `Count must be numeric`;
                    },
                    default: 5,
                },
            ]
        });
    }

    async run(message, {name, stat, count}) {
        const users = await util.request.r6dbAPI(`https://r6db.com/api/v2/players?name=${name}&platform=PC`);
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
            if (userId.length > 0) {
                let uri = `https://r6db.com/api/v2/players/${userId}?platform=PC&update=false`;
                const userDetails = await util.request.r6dbAPI(uri);
                message.embed(this.createEmbed(userDetails, stat, count));
            }
        }
    }

    createEmbed(details, stat, count) {
        let embed = new RichEmbed()
            .setAuthor(`${details.name}`, `http://uplay-avatars.s3.amazonaws.com/${details.userId}/default_146_146.png`, `https://r6db.com/player/${details.userId}/ops`)
            .setTimestamp()
            .setDescription(`${details.name}'s top ${count} operators in ${stat}`);

        let statProp = '';
        switch (stat.toLowerCase()) {
            case 'time':
                statProp = 'time';
                break;
            case 'kills':
                statProp = 'kills';
                break;
            case 'wins':
                statProp = 'won';
                break;
            case 'winrate':
                statProp = 'winrate';
                break;
            case 'kd':
                statProp = 'kd';
                break;
        }

        let operators = Object.values(details.stats.operator);
        operators = this.populateOps(operators);
        operators.sortBy('-' + statProp);
        console.log(operators);
        for (let i = 0; i < parseInt(count); i++) {
            let operator = operators[i];
            embed.addField(
                `${operator.name}`,
                `Kills: ${operator.kills} - Deaths: ${operator.deaths} - KDR: ${operator.kd}\n` +
                `Wins: ${operator.won} - Loss: ${operator.lost} - Win Percent: ${operator.winrate}\n` +
                `Time Played: ${operator.time} hours` +
                ``,
                false
            )
        }
        return embed;
    }

    populateOps(operators) {
        for (let i in operators) {
            let operator = operators[i];
            operators[i].kd = (operator.kills / operator.deaths).toFixed(2);
            operators[i].winrate = (operator.won / (operator.won + operator.lost) * 100).toFixed(2);
            operators[i].time = (operator.timePlayed / 60 / 60).toFixed(2);
        }
        return operators;
    }
};