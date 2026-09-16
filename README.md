# 💍 Parthiban & Kavya — Wedding Invitation Website

A luxury, interactive mobile-first digital wedding invitation celebrating the union of **Parthiban & Kavya** on **November 14 & 15, 2026** in Chennai, Tamil Nadu.

---

## ✨ Features

- **💌 Royal 3D Wax Seal & Envelope Opening**: Interactive 3D wax seal stamped with couple monogram **"P & K"** with smooth unrolling and flap opening animation.
- **🎵 Romantic Background Melody**: Atmospheric wedding music with equalizer indicator and user-friendly toggle controls.
- **✨ Interactive "Scratch to Reveal" Date Card**: HTML5 Canvas foil scratch card that reveals the wedding date with celebratory confetti.
- **🗓️ 1-Click Calendar Sync**: Direct integration with Google Calendar, Apple Calendar, and Outlook (`.ics`).
- **⏳ Live Muhurtham Countdown**: Real-time days, hours, minutes, and seconds countdown to the auspicious Muhurtham.
- **📸 Couple Welcome Card**: Romantic welcome portrait framing and wedding timeline.
- **📍 Venue Navigation**: Sri Padmavathi Mahal A/c Thirumana Mandapam with direct 1-click Google Maps navigation.
- **📱 Floating Mobile Navigation Bar**: Sticky bottom menu designed specifically for mobile smartphone browsers.

---

## 📁 Project Structure

```text
wedding_invite_link/
├── assets/
│   ├── bg_music.m4a               # Background wedding melody
│   ├── couple_traditional.png     # Couple traditional attire cutout (high-res)
│   ├── couple_traditional.webp    # Optimized WebP couple cutout
│   ├── invitation_original.jpeg   # Original printed invitation card
│   └── welcome_card.jpeg          # Couple welcome photo portrait
├── raw_assets/                    # Archived raw WhatsApp media files
├── .gitignore                     # Git ignore rules for OS and logs
├── .nojekyll                      # Disables Jekyll processing on GitHub Pages
├── README.md                      # Project documentation and deployment guide
├── app.js                         # Interactive JavaScript logic and animations
├── index.html                     # Semantic HTML5 entry point for GitHub Pages
└── style.css                      # Vanilla CSS luxury mobile-first styling
```

---

## 🚀 How to Deploy to GitHub Pages

### Step 1: Initialize Git and Commit
Open your terminal in this project folder and run:
```bash
git init
git add .
git commit -m "feat: Luxury wedding invitation website for Parthiban & Kavya"
```

### Step 2: Create a Repository on GitHub and Push
1. Go to [github.com/new](https://github.com/new) and create a repository (e.g. `wedding-invitation` or `wedding_invite_link`).
2. Link your local project and push:
```bash
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** (top tab) ➔ **Pages** (left sidebar).
3. Under **Build and deployment** ➔ **Source**, select **Deploy from a branch**.
4. Set the branch to **`main`** and folder to **`/(root)`**, then click **Save**.
5. Within 1–2 minutes, GitHub will generate your live link:
   ```text
   https://<your-username>.github.io/<your-repo-name>/
   ```

---

## 💻 Local Development & Preview

To run and preview the website locally on your computer:
```bash
# Python 3 local server
python3 -m http.server 3000
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.
