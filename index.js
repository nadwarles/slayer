// Server dummy agar Railway tetap aktif
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(3000, () => console.log('🌐 Web server aktif di port 3000'));

// Bot Minecraft
const mineflayer = require('mineflayer');

function startBot() {
  console.log('🔁 Menjalankan ulang bot...');
  const bot = mineflayer.createBot({
    host: 'palmrush.aternos.me', // Ganti dengan IP Aternos kamu
    port: 35534,
    username: 'Mizuru',   // Harus unik
    version: '1.12.2'
  });

  bot.on('spawn', () => {
    console.log('✅ Bot berhasil masuk ke dunia Minecraft.');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 10000);
  });

  bot.on('end', () => {
    console.log('❌ Bot terputus. Mencoba ulang sambungan dalam 15 detik...');
    setTimeout(startBot, 15000);
  });

  bot.on('error', (err) => {
    console.log('🚫 Error:', err.message);
    if (['ECONNREFUSED', 'ECONNRESET'].includes(err.code)) {
      setTimeout(startBot, 15000);
    }
  });
}

startBot();
