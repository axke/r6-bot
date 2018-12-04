const Commando = require('discord.js-commando'),
    {RichEmbed} = require('discord.js'),
    util = require('./../../utils'),
    moment = require('moment');

module.exports = class MatchCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'match',
            aliases: ['game'],
            group: 'generation',
            memberName: 'match',
            description: 'Create a match',
            examples: ['match player1, player2, player3'],
            args: [
                {
                    key: 'players',
                    prompt: 'Who is playing? (Comma Separated Values)',
                    type: 'string',
                },
            ]
        });
    }

    async run(message, {players}) {
        message.embed(this.generateTeams(players.split(',')));
    }

    generateEmbed(players) {
        // figure out teams
        players = this.shuffle(players);
        const middle = Math.ceil(players.length / 2);
        let embed = new RichEmbed()
            .setAuthor(`R6 Team Generation`)
            .addField(`Blue Team`, `${tplayers.splice(0, middle)}`, false)
            .addField(`Orange Team`, `${players.splice(middle, players.length)}`, false);
        // figure out the map
        const maps = [
            {
                name: 'Bank',
                thumb: 'https://vignette.wikia.nocookie.net/rainbowsix/images/3/3b/R6_EV_08Bank02_Ludo_Final_229466.jpg'
            },
            {
                name: 'Club House',
                thumb: 'https://vignette.wikia.nocookie.net/rainbowsix/images/4/49/R6_EV_04BikersClub02_Ludo_Final_229465.jpg'
            },
            {name: 'Villa', thumb: 'https://vignette.wikia.nocookie.net/rainbowsix/images/3/3e/Villa_-_Key_Art.png'},
            {
                name: 'Coastline',
                thumb: 'https://vignette.wikia.nocookie.net/rainbowsix/images/4/4d/Coastline_map_teaser_image.png'
            },
            {
                name: 'Border',
                thumb: 'https://vignette.wikia.nocookie.net/rainbowsix/images/1/15/R6S-dust-line-border.jpg'
            },
            {
                name: 'Consulate',
                thumb: 'https://vignette.wikia.nocookie.net/rainbowsix/images/f/fd/Consulate_updated_image.jpg'
            },
            {name: 'Oregon', thumb: 'https://vignette.wikia.nocookie.net/rainbowsix/images/9/96/Oregon.jpg'}
        ];
        const map = maps[Math.floor(Math.random() * maps.length)];
        embed.setDescription(`The map is: ${map.name}`);
        embed.setImage(`${map.thumb}`);
        return embed;
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
};