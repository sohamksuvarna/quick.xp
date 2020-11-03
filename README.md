# quick.xp

### Simple Leveling Framework for Discord Bots

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
- And much more...

<br>

## Getting Started
```js
const XP = require("quick.xp")
const xp = new XP.Manager();
```

<br>

## Quick Example with Discord.JS
```js
const Discord = require('discord.js');
const client = new Discord.Client();
const XP = require('quick.xp');
const xp = new XP.Manager();
 
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

## Need Help? Join the [Support Server](https://discord.gg/mKyRmPB)
<br>

## © Shade | Shade Development - 2020