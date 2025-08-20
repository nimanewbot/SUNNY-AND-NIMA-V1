const config = require('../config');
const { cmd } = require('../command');
const axios = require('axios');

cmd({
  on: "body"
}, async (conn, m, { isGroup }) => {
  try {
    if (config.MENTION_REPLY !== 'true' || !isGroup) return;
    if (!m.mentionedJid || m.mentionedJid.length === 0) return;

    const voiceClips = [
      "https://files.fm/u/jpj72jayyr",
      "https://files.fm/u/jpj72jayyr",
      "https://files.fm/u/jpj72jayyr",
      "https://files.fm/u/jpj72jayyr",
      "https://files.fm/u/jpj72jayyr",
      "https://files.fm/u/jpj72jayyr",
      "https://files.fm/u/jpj72jayyr",
      "https://files.fm/u/jpj72jayyr",
      "https://files.fm/u/jpj72jayyr",
      "https://files.fm/u/jpj72jayyr"
    ];

    const randomClip = voiceClips[Math.floor(Math.random() * voiceClips.length)];
    const botNumber = conn.user.id.split(":")[0] + '@s.whatsapp.net';

    if (m.mentionedJid.includes(botNumber)) {
      const thumbnailRes = await axios.get(config.MENU_IMAGE_URL || "https://files.catbox.moe/71l0oz.jpg", {
        responseType: 'arraybuffer'
      });
      const thumbnailBuffer = Buffer.from(thumbnailRes.data, 'binary');

      await conn.sendMessage(m.chat, {
        audio: { url: randomClip },
        mimetype: 'audio/mp4',
        ptt: true,
        waveform: [99, 0, 99, 0, 99],
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: {
            title: config.BOT_NAME || "SUNNY-AND-NIMA-V1",
            body: config.DESCRIPTION || "NIMESHA",
            mediaType: 1,
            renderLargerThumbnail: true,
            thumbnail: thumbnailBuffer,
            mediaUrl: "https://files.fm/u/jpj72jayyr", // Static image URL
            sourceUrl: "https://wa.me/+94726800969",
            showAdAttribution: true
          }
        }
      }, { quoted: m });
    }
  } catch (e) {
    console.error(e);
    const ownerJid = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    await conn.sendMessage(ownerJid, {
      text: `*Bot Error in Mention Handler:*\n${e.message}`
    });
  }
});
