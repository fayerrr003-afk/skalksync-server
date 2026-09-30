# SkalkSync Server

Cosmetics sync backend for **SkalkClient** Minecraft 1.8.9 mod.

## Deploy on Render.com (free)

1. Fork or clone this repo
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect this repo
4. **Build Command:** `npm install`
5. **Start Command:** `node server.js`
6. Copy your service URL (e.g. `https://skalksync.onrender.com`)
7. Set `SYNC_URL` in `CosmeticsSyncModule.java` to that URL and rebuild the mod

## Endpoints

| Endpoint | Description |
|---|---|
| `GET /set?user=NAME&data=JSON` | Upload own cosmetics profile |
| `GET /get?user=NAME` | Fetch another player cosmetics |
| `GET /ping` | Keep-alive (called every 8 min by the mod) |