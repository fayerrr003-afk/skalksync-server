const express = require('express');
const app = express();
const store = new Map();
const TTL = 10 * 60 * 1000;

// Cleanup stale entries every 2 minutes
setInterval(() => {
    const now = Date.now();
    for (const [user, val] of store.entries()) {
        if (now - val.ts > TTL) store.delete(user);
    }
}, 2 * 60 * 1000);

// Upload own cosmetics profile
app.get('/set', (req, res) => {
    const { user, data } = req.query;
    if (!user || !data) return res.status(400).json({ error: 'missing' });
    if (user.length > 32 || data.length > 2048) return res.status(400).json({ error: 'too large' });
    store.set(user.toLowerCase(), { data, ts: Date.now() });
    res.json({ ok: true });
});

// Fetch another player's cosmetics profile
app.get('/get', (req, res) => {
    const user = req.query.user;
    if (!user) return res.status(400).json({ error: 'missing' });
    const entry = store.get(user.toLowerCase());
    if (!entry || Date.now() - entry.ts > TTL) return res.json({ data: null });
    res.set('Cache-Control', 'public, max-age=60');
    res.json({ data: entry.data });
});

// Keep-alive ping (called every 8 min by the client so Render doesn't sleep)
app.get('/ping', (req, res) => res.send('pong'));
app.get('/', (req, res) => res.send('SkalkSync OK'));

app.listen(process.env.PORT || 3000, () => {
    console.log('SkalkSync server running');
});
