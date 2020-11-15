# quick.xp

### Powerful Leveling Framework for Discord Bots

<br>

[![NPM](https://nodei.co/npm/quick.xp.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/quick.xp/)

<br>

## Installation
```
npm i --save quick.xp
```
<br>

## Features
- Per-guild Leveling System
- Built-in cooldown
- Simple and easy to understand
- Supports MongoDB and SQLite Database
- TypeScript Support
- And much more...

<br>

## Getting Started
```js
const XP = require("quick.xp")
const xp = new XP.Manager();
```

<br>

## Quick Discord.JS Example with SQLite Database
```js
const Discord = require('discord.js');
const client = new Discord.Client();
const XP = require('quick.xp');
const xp = new XP.SQLiteManager();
 
client.on('ready', () => {
    console.log('Ready!')
})
 
client.on('message', (message) => {
    const level = xp.getLevel(message.guild.id, message.author.id)
    const userxp = xp.getXP(message.guild.id, message.author.id)
    xp.giveXP(message);
    if (message.content === "level") message.channel.send(`You are on level ${level} and have ${userxp} XP`)
    if (message.content === "leaderboard") {
        let lb = xp.leaderboard(message.guild.id, {limit: 10, raw: false});
        const embed = new Discord.MessageEmbed()
        .setTitle("Leaderboard")
        .setColor("BLURPLE")
        lb.forEach(m => {
            embed.addField(`${m.position}. ${client.users.cache.get(m.id).tag}`, `Level: ${xp.getLevel(message.guild.id, m.id)}\n XP: ${m.xp}`)
        })
        message.channel.send(embed);
    }
})
 
client.login("TOKEN");
```
<br>

## Discord.JS Example with MongoDB Database
```js
const Discord = require('discord.js');
const client = new Discord.Client();
const XP = require('quick.xp');
const xp = new XP.MongoManager("DB_URL");
 
client.on('ready', () => {
    console.log('Ready!')
})
 
client.on('message', async (message) => { // make the function asynchronous and add await
    const level = await xp.getLevel(message.guild.id, message.author.id)
    const userxp = await xp.getXP(message.guild.id, message.author.id)
    await xp.giveXP(message);
    if (message.content === "level") message.channel.send(`You are on level ${level} and have ${userxp} XP`)
    if (message.content === "leaderboard") {
        let lb = await xp.leaderboard(message.guild.id, {limit: 10, raw: false});
        const embed = new Discord.MessageEmbed()
        .setTitle("Leaderboard")
        .setColor("BLURPLE")
        lb.forEach(m => {
            embed.addField(`${m.position}. ${client.users.cache.get(m.id).tag}`, `Level: ${level}\n XP: ${m.xp}`)
        })
        message.channel.send(embed);
    }
})
 
client.login("TOKEN");
```

## Upcoming Changes
- Option to choose storage within XPManager Class
- JSON Storage
- Some more stuff
<br>

## Need Help? Join the [Support Server](https://discord.gg/mKyRmPB)
<br>

## © Shade | Shade Development - 2020
