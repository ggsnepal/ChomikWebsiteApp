# Status page setup

The status page (`/status.html`) needs a small database (Cloudflare KV) and a secret token. Do this once.

## 1. Create the KV namespace
1. Log in at https://dash.cloudflare.com.
2. Left menu: **Workers & Pages** -> **KV**.
3. Click **Create a namespace**, name it `chomik-status`, click **Add**.

## 2. Bind it to your Pages project
1. **Workers & Pages** -> click your project (`chomik-bot`).
2. **Settings** -> **Bindings** (older UI: **Functions** -> **KV namespace bindings**).
3. **Add** -> **KV namespace**. Variable name: `STATUS_KV` (exactly). Namespace: `chomik-status`. Save.
4. Do this for **Production** and again for **Preview**.

## 3. Add the secret token
1. Generate a long random token on your computer:
   `python -c "import secrets;print(secrets.token_urlsafe(32))"`
2. In the Pages project: **Settings** -> **Variables and Secrets** -> **Add**.
3. Type: **Secret**. Name: `STATUS_TOKEN`. Value: the token. Save (Production and Preview).
4. Keep the token; the bot needs the same one.

## 4. Redeploy
Bindings only apply to new deployments. Push the repo again, or **Deployments** -> latest deployment -> **...** -> **Retry deployment**.

## 5. Turn on the bot's heartbeat
The bot already contains the sender (`heartbeat.py`). It only needs the token. Set this environment
variable where the bot runs, then restart the bot:
```
STATUS_HEARTBEAT_TOKEN=<the same token>
```
(`STATUS_HEARTBEAT_URL` already defaults to `https://chomik-bot.pages.dev/api/heartbeat`. If you move
the site to your own domain, set `STATUS_HEARTBEAT_URL` too.) On start the console prints
`[heartbeat] sending to ...`. It sends one heartbeat every 120 seconds, plus a "shutting down" one when the bot stops cleanly.

## 6. Test
```
curl -i -X POST https://chomik-bot.pages.dev/api/heartbeat \
  -H "Authorization: Bearer YOUR_TOKEN" -H "Content-Type: application/json" \
  -d '{"latency_ms":42,"started_at":1700000000}'
```
Expect `200 {"ok":true}` (`401` = wrong token). Then open https://chomik-bot.pages.dev/status.html. The status response is cached for 30 seconds, so allow up to 30s for changes to appear.

## Troubleshooting
- **Page says "isn't configured yet"**: the `STATUS_KV` binding is missing or you haven't redeployed since adding it.
- **Always offline**: check the token matches exactly, the URL is correct, and the bot is sending heartbeats (curl test above). Offline means no heartbeat in the last 5 minutes.
- **curl returns 503**: `STATUS_KV` or `STATUS_TOKEN` isn't set for that environment (Production vs Preview).
- **KV limits**: the free plan allows about 1,000 writes per day. One heartbeat every 120s is about 720/day, so don't send them more often.
