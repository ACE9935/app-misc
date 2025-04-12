# Misc 🎧

**Misc** is a modern music streaming app built with **Next.js** and **React**, hosted on **Vercel**. It features a curated library of **75 songs** spanning across **5 genres**: Rock, EDM, Hip Hop, Pop, and Jazz.

All media assets — audio files and images — are stored in **Firebase Cloud Storage**. Metadata for each song (title, artist, duration, and album) is stored in **MongoDB**.

---

## 🚀 Features

### 🎵 Song Library
- 75 high-quality songs
- Genres: Rock, EDM, Hip Hop, Pop, Jazz
- Songs include metadata: `title`, `artist`, `duration`, and `album`
- Media files stored in Firebase Cloud Storage

### 🔍 Search & Artist Pages
- Search songs by artist name
- Each artist has a dedicated page listing all their songs

### 🔐 Authentication (NextAuth)
- Sign in via **Google**
- Or via **Email verification link**
- Authenticated users can:
  - Save songs as favorites
  - Add artists to their favorite list
  - Create custom playlists

### 🎧 Song Player
- Built using [`react-h5-audio-player`](https://github.com/lhz516/react-h5-audio-player)
- Options:
  - Loop current song
  - Auto-play a **random** next song
  - If a song is played from the homepage, the next/random song will be from the **same genre**

---

## 🧑‍💻 Tech Stack

- **Frontend**: React, Next.js, MUI, Tailwind
- **Sate Management**: Redux Toolkit
- **Authentication**: NextAuth.js
- **Storage**: Firebase Cloud Storage
- **Database**: MongoDB (for metadata)
- **Audio Player**: react-h5-audio-player
- **Deployment**: Vercel

---

## 🛠 Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Development Server

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

