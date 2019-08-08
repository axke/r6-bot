const Commando = require('discord.js-commando'),
    {
        RichEmbed
    } = require('discord.js'),
    util = require('./../../utils'),
    moment = require('moment');

module.exports = class CompositionCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'composition',
            aliases: ['team', 'composition', 'comp'],
            group: 'generation',
            memberName: 'composition',
            description: 'Create a team composition',
            examples: ['team', 'composition', 'comp'],
        });
    }

    async run(message) {
        message.embed(this.generateEmbed());
    }

    generateEmbed() {
        const attack = [
            'Buck', 'Blackbeard', 'Capitao', 'Hibana', 'Jackal', 'Ying', 'Zofia', 'Dokkaebi', 'Finka', 'Lion', 
            'Maverick', 'Nomad', 'Gridlock', 'Glaz', 'Blitz', 'Ash', 'Fuze', 'IQ', 'Sledge', 'Twitch', 'Thatcher',
            'Thermite', 'Montagne'
        ];
        const defense = [
            'Frost', 'Valkyrie', 'Caviera', 'Echo', 'Mira', 'Ela', 'Lesion', 'Vigil', 'Alibi', 'Maestro', 'Clash', 
            'Kaid', 'Mozzie', 'Smoke', 'Mute', 'Castle', 'Pulse', 'Doc', 'Rook', 'Kapkan', 'Tachanka', 'Jager', 'Bandit',            
        ];

        const attackTeam = this.fiveRandoms(attack);
        const defenseTeam = this.fiveRandoms(defense);
        
        let embed = new RichEmbed()
            .setAuthor(`R6 Team Composition Generator`)
            .addField(`Attack`, this.arrayToList(attackTeam), false)
            .addField(`Defense`, this.arrayToList(defenseTeam), false);        
        return embed;
    }

    fiveRandoms(operators) {
        let randoms = [];
        let c = 5;
        for (let n = 0; n < c; n++) {
            let num = Math.floor(Math.random() * operators.length - n);
            n = Math.min(n + 1, c);
            randoms.push(operators.splice(num, 1));  
        }
        return randoms;              
    }

    arrayToList(selection) {
        let result = '';
        selection.forEach((s, index) => {
            result += `${index + 1}. ${s}\n`;
        });
        return result;
    }
};