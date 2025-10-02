const { Client, GatewayIntentBits, Partials, AttachmentBuilder } = require('discord.js');
const fs = require('fs');
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('UwU Bot is alive!'));
app.listen(process.env.PORT || 3000);

let prefixes = {};
const PREFIX_FILE = './prefixes.json';
if (fs.existsSync(PREFIX_FILE)) prefixes = JSON.parse(fs.readFileSync(PREFIX_FILE, 'utf-8'));

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Channel]
});

const defaultPrefix = 'UwU';

const commands = {
  help: { execute: (m,p)=>m.channel.send(Object.keys(commands).map(c=>`\`${p}${c}\``).join(', ')) },
  kaçkilo: { execute: m=>m.channel.send(`Senin kilon: ${Math.floor(Math.random()*100)+30}kg`) },
  aşkölçer: { execute: (m,p,a)=>{ if(a.length<2)return m.channel.send(`${p}aşkölçer @kişi1 @kişi2`); m.channel.send(`${a[0]} ile ${a[1]}: ${Math.floor(Math.random()*101)}% uyumlusunuz!`) } },
  fbi: { execute: m=>m.channel.send('FBI OPEN UP! 🚨') },
  sunucu: { execute: m=>m.channel.send(`Sunucu: ${m.guild.name}\nÜye sayısı: ${m.guild.memberCount}`) },
  ölümtarihim: { execute: m=>m.channel.send(`Ölümtarihin: ${Math.floor(Math.random()*31)+1}/${Math.floor(Math.random()*12)+1}/${Math.floor(Math.random()*30)+2025}`) },
  cehennemibiletim: { execute: m=>{ const yer=['Cehennem A','Cehennem B','Cehennem C']; m.channel.send(`Cehennem biletin: ${yer[Math.floor(Math.random()*yer.length)]}`) } },
  troll: { execute: m=>m.channel.send('TROLLLLLLL 😂') },
  nasihat: { execute: m=>{ const n=['Sabırlı ol!','Dikkat et!','Gülümse :)']; m.channel.send(n[Math.floor(Math.random()*n.length)]) } },
  W: { execute: (m,p,a)=>{ if(!m.member.permissions.has('ManageGuild'))return m.channel.send('Yönetici olmalısın.'); if(!a[0])return m.channel.send('Yeni prefixi gir.'); prefixes[m.guild.id]=a[0]; fs.writeFileSync(PREFIX_FILE, JSON.stringify(prefixes,null,2)); m.channel.send(`Prefix değiştirildi: ${a[0]}`) } }
};

client.on('messageCreate', m=>{
  if(m.author.bot)return;
  const p = prefixes[m.guild?.id]||defaultPrefix;
  if(!m.content.startsWith(p))return;
  const args = m.content.slice(p.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  if(commands[cmd])commands[cmd].execute(m,p,args);
});

client.login(process.env.MTQyMzM1MTU3NzY0ODgyNDM3MQ.G8oEJS.QCdCQBOB3UJ0NlY1udzADu5Cyc7QmcQN3g8LxU);
