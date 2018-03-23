const {RichEmbed} = require('discord.js');

module.exports = (command, message, error) => {
    console.log(command);
    console.log(error);
    let embed = new RichEmbed()
        .setAuthor(`Error`)
        .setTimestamp()
        .setDescription(error);

    message.embed(embed);
};