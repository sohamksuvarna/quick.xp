const XPError = require('./XPError');
let { Database } = require('quickmongo');
let db;
class MongoManager {

    constructor(mongodbURL) {
     this.db = new Database(mongodbURL)    
    }

    /**
     * giveXP - Give XP on message
     * @param {String} message Message Parameter
     * @param { Number } xprate The rate of XP
*/

async giveXP(message, xprate) {
    if (!message) throw new XPError('Message was not provided!')
    if (!xprate) xprate = 1;
    if (isNaN(xprate)) throw new XPError(`The XP Rate provided isn't a number!`)
    
    let cooldown = 60000;
    let level = await this.db.get(`level_${message.guild.id}_${message.author.id}`) || db.set(`level_${message.guild.id}_${message.author.id}`, 0); 
    let lastxp = await this.db.get(`xpcooldown_${message.guild.id}_${message.author.id}`);
    if (lastxp !== null && cooldown - (Date.now() - lastxp) > 0) return;
    
    let amount = (Math.floor(Math.random() * 5) + 15) * xprate;
    let xp = await this.db.add(`xp_${message.guild.id}_${message.author.id}`, amount);
    let previousrequired = await this.db.get(`previousrequired_${message.guild.id}_${message.author.id}`);
    if (previousrequired === null) await this.db.set(`previousrequired_${message.guild.id}_${message.author.id}`, 0);
    
    let nextlevel = level + 1;
    let required = previousrequired + 50 * nextlevel;
    await this.db.set(`requiredxp_${message.guild.id}_${message.author.id}`, required);
    await this.db.set(`xpcooldown_${message.guild.id}_${message.author.id}`, Date.now());
    let abacus = await this.db.get(`requiredxp_${message.guild.id}_${message.author.id}`) || db.set(`requiredxp_${message.guild.id}_${message.author.id}`, 50);

    if (xp > required) {
        await this.db.set(`previousrequired_${message.guild.id}_${message.author.id}`, required);
        await this.db.set(`level_${message.guild.id}_${message.author.id}`, nextlevel);
        message.channel.send(`:tada: | ${message.author.tag} just advanced to level ${nextlevel}`).then(m => m.delete({timeout: 10000}));

    }
}

/**
     * getLevel - Get Level of the Specified User
     * @param { String } guildid Guild ID
     * @param { Number } userid User ID
*/

async getLevel(guildid, userid) {
 if (!guildid) throw new XPError('Guild ID was not provided!')
 if (!userid) throw new XPError('User ID was not provided!');
 return await this.db.get(`level_${guildid}_${userid}`)
}

/**
     * getXP - Get XP of the Specified User
     * @param {String} guildid Guild ID
     * @param { Number } userid User ID 
*/

async getXP(guildid, userid) {
    if (!guildid) throw new XPError('Guild ID was not provided!')
    if (!userid) throw new XPError('User ID was not provided!');
    return await this.db.get(`xp_${guildid}_${userid}`)       
}

/**
     * leaderboard - leaderboard
     * @param {String} guildid Guild ID
     * @param {Object} options Options = { limit: 10, raw: false }
     * @returns leaderboard[]
*/
async leaderboard(guildid, options = {}) {
        if (!guildid) throw new XPError("Guild ID wasn't provided!")
        let limit = options.limit || 10;
        if (isNaN(limit)) throw new XPError("The limit provided isn't a number!");
        let raw = options.raw || false;
        let all = await this.db.startsWith(`xp_${guildid}_`)
        let lb = all.sort((a, b) => b.data - a.data);
        if (!(parseInt(limit) <= 0)) lb.length = parseInt(limit);
        if (raw === true) return lb;
        var final = [];
        var i = 0;
        for (i in lb) {

            let obj = {
                position: lb.indexOf(lb[i]) + 1,
                id: lb[i].ID.split('_')[2],
                xp: lb[i].data,
            };
            final.push(obj);
        };
        return final;
}

/**
     * resetLevel - Reset Level of the Specified User
     * @param { String } guildid Guild ID
     * @param { Number } userid User ID
*/


async resetLevel(guildid, userid) {
    if (!guildid) throw new XPError('Guild ID was not provided!')
    if (!userid) throw new XPError('User ID was not provided!');
    await this.db.delete(`xp_${guildid}_${userid}`)
    await this.db.delete(`level_${guildid}_${userid}`)
    return `Data of "${userid}" for "${guildid}" has been deleted. Their levels are reset.`
}

/**
     * reset - Delete the Database
*/

async reset() {
    console.log('The database was reset');
    this.db.deleteAll()
}

}

module.exports = MongoManager;
