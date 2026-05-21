#!/usr/bin/env node
/**
 * scripts/setup-bot.mjs
 *
 * Wires the Telegram bot's menu button to your deployed WebApp URL.
 * Usage:
 *   BOT_TOKEN=xxx WEBAPP_URL=https://your-domain.example node scripts/setup-bot.mjs
 *
 * Reads env vars (no CLI args, no prompts) so it slots into CI/CD cleanly.
 */

const { BOT_TOKEN, WEBAPP_URL, BUTTON_TEXT = 'Открыть ToKnow' } = process.env;

if (!BOT_TOKEN || !WEBAPP_URL) {
  console.error('Usage: BOT_TOKEN=... WEBAPP_URL=... node scripts/setup-bot.mjs');
  process.exit(1);
}

const api = (m) => `https://api.telegram.org/bot${BOT_TOKEN}/${m}`;

const post = async (method, body) => {
  const r = await fetch(api(method), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  const data = await r.json();
  if (!data.ok) {
    console.error(`✗ ${method}:`, data);
    process.exit(1);
  }
  return data.result;
};

const me = (await (await fetch(api('getMe'))).json()).result;
console.log(`Connected as @${me.username}`);

await post('setChatMenuButton', {
  menu_button: { type: 'web_app', text: BUTTON_TEXT, web_app: { url: WEBAPP_URL } },
});
console.log(`✓ Menu button set → "${BUTTON_TEXT}" → ${WEBAPP_URL}`);

await post('setMyCommands', {
  commands: [
    { command: 'start', description: 'Запустить ToKnow' },
    { command: 'help', description: 'О приложении' },
  ],
});
console.log('✓ Commands registered');

await post('setMyDescription', {
  description:
    'ToKnow — карточная игра для глубоких разговоров. Узнавай ближе друзей, семью и любимых.',
});
await post('setMyShortDescription', {
  short_description: 'Карты для разговоров. Играй прямо в Telegram.',
});
console.log('✓ Description set');
console.log('\nDone. Open @' + me.username + ' and tap the menu button.');
