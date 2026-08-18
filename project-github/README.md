# 🎵 Music Player

A minimal, native-feeling music player with:
- **YouTube Search** — via Google Cloud YouTube Data API v3 (legal ✅)
- **Local library** — play files from your device
- **Playlists** — create and manage
- **PWA** — installable on any device
- **Dark / Light / System** themes, accent colors, 6 languages

## Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/music-player
cd music-player
cp .env.example .env   # fill in GOOGLE_API_KEY
npm install
npm run dev            # → http://localhost:3000/player.html
```

## YouTube API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project → **Enable "YouTube Data API v3"**
3. **Credentials** → Create API Key → restrict to YouTube Data API v3
4. Add to `.env`: `GOOGLE_API_KEY=your_key_here`

> The app searches YouTube's **public** metadata only (titles, durations, thumbnails).  
> Playback uses the embedded YouTube IFrame Player — fully within YouTube's ToS.

## Build & Deploy

### Web
```bash
npm run build   # → dist/
```
Upload `dist/` to any static host (Cloudflare Pages, Vercel, Netlify, etc.).

### GitHub Actions (automatic)

Push to `main` or create a tag `v1.0.0` to get:

| Artifact | Description |
|----------|-------------|
| `app.zip` | Web build ready to deploy |
| `app.apk` | Android APK (TWA via Bubblewrap) |
| `app.ipa` | iOS IPA (PWA shell, sideloadable) |

#### Required Secrets (Settings → Secrets → Actions)

| Secret | Description |
|--------|-------------|
| `GOOGLE_API_KEY` | YouTube Data API v3 key |
| `VITE_SUPABASE_URL` | Supabase URL (optional) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase key (optional) |

#### For signed APK add:

| Secret | Description |
|--------|-------------|
| `ANDROID_KEYSTORE_BASE64` | `base64 -w0 your.jks` |
| `ANDROID_KEY_ALIAS` | Key alias |
| `ANDROID_STORE_PASSWORD` | Store password |
| `ANDROID_KEY_PASSWORD` | Key password |
| `TWA_SHA256_FINGERPRINT` | SHA-256 cert fingerprint |

Also set the **variable** `APP_URL` (e.g. `https://your-app.pages.dev`) in  
**Settings → Variables → Actions**.

#### For signed IPA add:

| Secret | Description |
|--------|-------------|
| `IOS_CERTIFICATE_BASE64` | `base64 -w0 cert.p12` |
| `IOS_CERTIFICATE_PASSWORD` | .p12 password |
| `IOS_PROVISIONING_PROFILE_BASE64` | `base64 -w0 profile.mobileprovision` |

## Project Structure

```
├── public/
│   ├── player.html       # Main app (standalone HTML + JS)
│   ├── manifest.json     # PWA manifest
│   ├── sw.js             # Service Worker
│   └── icons/            # App icons
├── src/
│   ├── routes/
│   │   ├── index.tsx     # Redirects / → /player.html
│   │   └── api/public/
│   │       └── yt-search.ts  # Server-side YouTube API proxy
│   └── ...
├── scripts/
│   └── generate-icons.mjs
└── .github/workflows/
    └── build.yml         # CI/CD pipeline
```

## Stack

- **TanStack Start** — SSR + file-based routing
- **React 19** + **Tailwind CSS v4**
- **YouTube Data API v3** via Google Cloud
- **IndexedDB** — local music library
- **Web Audio API** — visualizer + equalizer
- **Media Session API** — lock screen controls

## License

MIT
