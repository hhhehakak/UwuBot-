const { Client, GatewayIntentBits, Partials } = require('discord.js');
const fs = require('fs');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

let prefixes = {};
const PREFIX_FILE = './prefixes.json';
if (fs.existsSync(PREFIX_FILE)) {
  prefixes = JSON.parse(fs.readFileSync(PREFIX_FILE, 'utf-8'));
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

const defaultPrefix = 'UwU';

app.get('/', (req, res) => res.send('UwU Bot is alive!'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const commands = {
  help: {
    execute: (message, prefix) => {
      const cmdList = Object.keys(commands).map(c => `\`${prefix}${c}\``).join(', ');
      message.channel.send(`Komutlar: ${cmdList}`);
    }
  },
  kaçkilo: {
    execute: (message) => {
      const kilo = Math.floor(Math.random() * 100) + 30;
      message.channel.send(`Senin kilon: ${kilo}kg`);
    }
  },
  aşkölçer: {
    execute: (message, prefix, args) => {
      if(args.length < 2) return message.channel.send(`Kullanım: ${prefix}aşkölçer @kişi1 @kişi2`);
      const oran = Math.floor(Math.random()*101);
      message.channel.send(`${args[0]} ile ${args[1]}: ${oran}% uyumlusunuz!`);
    }
  },
  fbi: {
    execute: (message) => {
      message.channel.send('FBI OPEN UP! 🚨');
    }
  },
  sunucu: {
    execute: (message) => {
      message.channel.send(`Sunucu: ${message.guild.name}\nÜye sayısı: ${message.guild.memberCount}`);
    }
  },
  ölümtarihim: {
    execute: (message) => {
      const gün = Math.floor(Math.random()*31)+1;
      const ay = Math.floor(Math.random()*12)+1;
      const yıl = Math.floor(Math.random()*30)+2025;
      message.channel.send(`Ölümtarihin: ${gün}/${ay}/${yıl}`);
    }
  },
  cehennemibiletim: {
    execute: (message) => {
      const yer = ['Cehennem A', 'Cehennem B', 'Cehennem C'];
      const sec = yer[Math.floor(Math.random()*yer.length)];
      message.channel.send(`Cehennem biletin: ${sec}`);
    }
  },
  troll: {
    execute: (message) => {
      message.channel.send('TROLLLLLLL 😂');
    }
  },
  nasihat: {
    execute: (message) => {
      const nasihatler = ['Sabırlı ol!', 'Dikkat et!', 'Gülümse :)'];
      message.channel.send(nasihatler[Math.floor(Math.random()*nasihatler.length)]);
    }
  },
  W: {
    execute: (message, prefix, args) => {
      if(!message.member.permissions.has('ManageGuild')) return message.channel.send('Yönetici olmalısın.');
      if(!args[0]) return message.channel.send('Yeni prefixi gir.');
      prefixes[message.guild.id] = args[0];
      fs.writeFileSync(PREFIX_FILE, JSON.stringify(prefixes, null, 2));
      message.channel.send(`Prefix değiştirildi: ${args[0]}`);
    }
  }
};

client.on('messageCreate', (message) => {
  if(message.author.bot) return;
  const prefix = prefixes[message.guild?.id] || defaultPrefix;
  if(!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  if(commands[cmd]) commands[cmd].execute(message, prefix, args);
});

client.login(process.env.MTQyMzM1MTU3NzY0ODgyNDM3MQ.Gm6a-t.KBb3yZIPOo7Q5igYae3Iiymr8UXZVD0dRO7JP8);
