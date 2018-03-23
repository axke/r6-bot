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
    });
  }

  async run(message, args) {
    let name = args;
    const users = await util.request.r6dbAPI(`https://r6db.com/api/v2/players?name?${name}&platform=PC`);
    let userId = '';
    if (users && users.length > 0) {
      for (let user in users) {
        if (user.name.toLowerCase() == name.toLowerCase()) {
          userId = user.userId;
          break;
        }
      }
      if (userId.length > 0) {
        const userDetails = await util.request.r6dbAPI(`https://r6db.com/api/v2/players/${userId}?platform=PC&update=true`);
        message.embed(this.createEmbed(userDetails));
      }
    }
  }

  createEmbed(details) {
    let embed = new RichEmbed()
      .setAuthor(`${details.name}`, ``)
      .setTimestamp()
      .setDescription(`Players rank in NA for the current season`);
    const currentSeasonNA = details.seasonRanks[details.seasonRanks.length].ncsa;
    const ranks = util.ranks;
    // Rank
    embed.addField(`Rank`, `Current: ${ranks[currentSeason.rank]}\nBest: ${ranks[currentSeasonNA.max_rank]}`, false);
    embed.addField(`Stats`, `Wins: ${currentSeasonNA.wins}\nLoss: ${currentSeasonNA.losses}\nWin Percent: ${currentSeasonNA.wins / (currentSeasonNA.wins + currentSeasonNA.losses)}`, false);

    return embed;
  }
};