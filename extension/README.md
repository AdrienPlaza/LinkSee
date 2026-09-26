# 🔗 LinkSee — Chrome Extension

> Extract, browse and export all links from any webpage — in one click.

![Version](https://img.shields.io/badge/version-1.2-blue)
![Manifest](https://img.shields.io/badge/manifest-v3-orange)

---

## 🚀 Quick Install (30 seconds)

Since LinkSee is not on the Chrome Web Store, you install it as an **unpacked extension**. It takes less than 30 seconds.

### 1. Open your browser's extension page

Copy and paste the right URL in your address bar:

| Browser | URL |
|---|---|
| **Chrome** | `chrome://extensions/` |
| **Edge** | `edge://extensions/` |
| **Brave** | `brave://extensions/` |
| **Opera** | `opera://extensions/` |

### 2. Enable Developer Mode

In the **top-right corner** of the page, toggle **"Developer mode"** ON.

### 3. Load the extension

1. Click the **"Load unpacked"** button (top-left)
2. Navigate to and select the **folder containing `manifest.json`**
   - ⚠️ Select the **folder itself**, not a file inside it
3. ✅ LinkSee is now installed!

### 4. Pin it (recommended)

1. Click the **🧩 puzzle piece** icon in your browser toolbar
2. Find **LinkSee** in the list
3. Click the **📌 pin** icon next to it

The LinkSee logo will now appear in your toolbar, ready to use.

---

## 🚀 Usage

### Open the panel — 3 ways

| Method | How |
|---|---|
| 🖱️ **Floating button** | Round blue button in the bottom-right of any page |
| 🔧 **Toolbar icon** | Click the LinkSee icon in your toolbar |
| ⌨️ **Keyboard** | Press `Alt + L` on any page |

### Inside the panel

- 🔍 **Search** links by text, URL or domain
- 🎯 **Filter** by type (Internal, External, Anchors, Email, Phone, Files)
- 📊 **Sort** by text, URL or length
- 📋 **Copy** individual links or all at once
- 📥 **Export** to TXT or CSV
- 🔓 **Open** any link in a new tab

### Close the panel

Click **✖** in the header, or press `Esc`.

---

## ⌨️ Shortcuts

| Action | Key |
|---|---|
| Open / close panel | `Alt + L` |
| Close panel | `Esc` |
| Focus search | `/` (when panel is open) |

---

## 📂 Folder structure

```
LinkSee/
├── manifest.json          ← Extension config
├── background.js          ← Service worker
├── content.js             ← Main script
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md              ← This file
```

⚠️ **Do not rename or move any file** — Chrome relies on the exact structure defined in `manifest.json`.

---

## ❓ Troubleshooting

**"Manifest file is missing or unreadable"**
→ Make sure you selected the **folder** containing `manifest.json`, not a parent folder.

**The floating button doesn't appear on some pages**
→ Some sites (like `chrome://`, `chrome-extension://`, or the Chrome Web Store) block content scripts. This is normal and cannot be bypassed.

**The extension disappeared after restarting Chrome**
→ Make sure the folder you selected still exists on your disk. If you move or delete it, Chrome loses the extension. Re-install from the same or a new location.

**Nothing happens when I click the toolbar icon**
→ Make sure **Developer mode** is enabled and the extension appears as "Enabled" in `chrome://extensions/`. If needed, click the 🔄 **Reload** button on the extension's card.

---

## 🌐 Links

- 📦 **GitHub repo**: https://github.com/AdrienPlaza/LinkSee
- 🐛 **Report a bug**: https://github.com/AdrienPlaza/LinkSee/issues
- 📜 **Source code**: https://github.com/AdrienPlaza/LinkSee/blob/main/extension/content.js
- ⭐ **Star the repo** if you like it!

---

## ⚠️ Disclaimer

This extension is provided for educational and personal purposes only. Use at your own risk. See the LICENSE file for details.

---

## 👤 Author

**AdrienPlaza**

- 🎮 Passionate about programming, 3D, and VR
- 💻 Unity · Blender · Java · Python · JavaScript · HTML · C++ · Lua

---

Made with ❤️ for the web.