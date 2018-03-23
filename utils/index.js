require('./string');
require('./object');

module.exports = new function utils() {
    this.request = require('./request');
    this.errorEmbed = require('./errorEmbed');
    this.ranks = [
        'Unranked',
        'Copper 4', 'Copper 3', 'Copper 2', 'Copper 1',
        'Bronze 4', 'Bronze 3', 'Bronze 2', 'Bronze 1',
        'Silver 4', 'Silver 3', 'Silver 2', 'Silver 1',
        'Gold 4', 'Gold 3', 'Gold 2', 'Gold 1',
        'Platinum 3', 'Platinum 2', 'Platinum 1', 'Diamond',
    ];
}