# Extension - Screen Recorder

This is a Extension that enables screen recording directly from the browser. The extension records the screen and saves the output as a downloadable video file.

## 📁 Project Structure

Extension
├─ background.js # Background script handling runtime events
├─ content.js # Script injected into web pages for DOM interaction
├─ css
│  └─ styles.css # Styling for the extension popup
├─ images
│  ├─ icon-128x128.png # Extension icon (128x128)
│  ├─ icon-16x16.png # Extension icon (16x16)
│  └─ icon-32x32.png # Extension icon (32x32)
├─ js
│  └─ popup.js # Main logic for screen recording
├─ manifest.json # Extension manifest file with permissions and metadata
├─ popup.html # HTML UI for the extension popup
└─ README.md


markdown
Copy
Edit

## ✅ Features

- Start/stop screen recording
- Automatically downloads the video after stopping
- Records in `.webm` format (or renamed `.mp4`)
- Clean popup UI
- Lightweight and fast

## 🛠️ How to Install

1. Open Edge/Chrome/Brave and go to `(browser)://extensions/`
2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select the `Extension` folder

## ⚙️ How It Works

- Clicking the extension icon shows the popup (`popup.html`)
- The popup JavaScript (`popup.js`) requests screen capture
- `MediaRecorder` API records the screen and generates a `.webm` blob
- After stopping, the blob is automatically downloaded

## 📦 Dependencies

- Native browser APIs (no external dependencies)
- HTML5, CSS3, and vanilla JavaScript

## 📌 Note

The file is saved in `.webm` format due to browser limitations. You can rename it to `.mp4` for compatibility, but it's not a real `.mp4` unless converted with a tool like FFmpeg.
