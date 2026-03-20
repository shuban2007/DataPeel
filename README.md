# 🔐 Data Peel

**Peel away hidden data before you share.**

Data Peel is a privacy-first web application that removes sensitive metadata from images and videos directly in your browser — ensuring your files are safe to share without exposing personal information.

🌐 Live Demo: https://data-peel.vercel.app

---

## 🚀 Overview

Most media files contain hidden metadata such as location, device details, timestamps, and more. Data Peel helps users **sanitize their media** by stripping all such information before sharing.

Unlike traditional tools, Data Peel performs all processing **locally in the browser**, ensuring maximum privacy and zero data exposure.

---

## 🔐 Privacy First

> **Your files never leave your device.**

* No uploads
* No backend processing
* No data storage
* No tracking

Everything runs entirely on the client-side.

---

## ✨ Features

* 🖼️ **Image Metadata Removal**

  * Removes EXIF, GPS, device info, timestamps, and more using Canvas API

* 🎥 **Video Metadata Stripping**

  * Uses ffmpeg.wasm to remove hidden metadata, chapters, and unnecessary streams

* 🔍 **Metadata Inspector**

  * View sensitive metadata before cleaning

* 🛡️ **Sanitization Report**

  * Clear breakdown of what data was removed

* ⚡ **Client-Side Processing**

  * Fast, secure, and private

* 📱 **Responsive Design**

  * Works across desktop and mobile devices

* 🎨 **Modern UI**

  * Dark theme with smooth animations and premium design

---

## 🧠 How It Works

### Images

* Loaded into browser memory
* Redrawn using Canvas API
* Exported as a clean file (no metadata retained)

### Videos

* Processed using WebAssembly-powered FFmpeg
* Removes:

  * Metadata
  * Chapters
  * Hidden streams
* Re-encoded into a clean output file

---

## ⚙️ Tech Stack

* **Frontend:** Next.js (App Router), React
* **Styling:** Tailwind CSS
* **Video Processing:** ffmpeg.wasm
* **Image Processing:** Canvas API
* **Architecture:** Fully client-side (no backend)

---

## 🛡️ Security & Stability

* File size validation (up to 100MB images, 1GB videos)
* Device-aware handling
* Web Workers for heavy processing
* Memory cleanup to prevent leaks
* Graceful error handling

---

## 📦 Installation (Local Setup)

```bash
git clone https://github.com/shuban2007/DataPeal.git
cd DataPeal
npm install
npm run dev
```

---

## 🚀 Deployment

Deployed on Vercel for seamless Next.js hosting.

---

## 👨‍💻 Author

**Shuban**
📧 [shuban1227@gmail.com](mailto:shuban1227@gmail.com)
🔗 https://github.com/shuban2007

---

## 💡 Future Improvements

* Face blur for privacy enhancement
* Sensitive content detection
* Batch processing support
* File compression options

---

## ⭐ Final Note

Data Peel is built with a strong focus on **privacy, performance, and real-world usability**.
It demonstrates how powerful browser-based processing can be when combined with modern web technologies.

---
