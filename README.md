# 🔗 LinkSee

> A lightweight Chrome extension that extracts, browses and exports all links from any webpage — with search, filters, sorting, dark mode and one-click copy.

![Version](https://img.shields.io/badge/version-1.2-blue)
![Platform](https://img.shields.io/badge/platform-Chrome%20%7C%20Edge%20%7C%20Brave-green)
![License](https://img.shields.io/badge/license-MIT-green)
![Manifest](https://img.shields.io/badge/manifest-v3-orange)

---

## 📥 Download

**[→ Download the latest release](https://github.com/AdrienPlaza/LinkSee/releases/latest)**

Grab the `LinkSee.zip` file, extract it, and follow the [installation guide](#-installation).

---

## 📸 Preview
<img width="74" height="75" alt="boutton" src="https://github.com/user-attachments/assets/b894feaf-a3a0-44c5-a39a-b14ad3256b6b" />

*The button.*

<img width="1707" height="821" alt="linksee" src="https://github.com/user-attachments/assets/a5e1c43f-d15e-4b3d-b147-85f82421bf5b" />

*The LinkSee panel with search, filters, sort, statistics and export options.*

---

## 📖 About

**LinkSee** is a browser extension that reveals **every link on the page you're viewing** — instantly, in a clean, focused panel. No more digging through the HTML or the DevTools inspector.

Perfect for:
- 🔍 Quickly auditing links on a page
- 📋 Copying URLs without leaving the site
- 🕵️ Exploring a page's structure
- 💻 Developers debugging broken or hidden links
- 📊 Analyzing link types (internal, external, files, emails…)
- 📤 Exporting links to CSV or TXT for further analysis

---

## ⚙️ Installation

Since LinkSee is not yet on the Chrome Web Store, you install it manually in under 30 seconds.

### 1. Download the extension

- Go to the [**latest release**](https://github.com/AdrienPlaza/LinkSee/releases/latest)
- Download **`LinkSee.zip`**
- **Extract it** somewhere on your computer

You should end up with a folder containing:
```
manifest.json
background.js
content.js
icons/
  ├── icon16.png
  ├── icon48.png
  └── icon128.png
README.md
```

### 2. Load it in your browser

1. Open your browser's extension page:
   - **Chrome**: `chrome://extensions/`
   - **Edge**: `edge://extensions/`
   - **Brave**: `brave://extensions/`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **"Load unpacked"**
4. Select the **folder containing `manifest.json`**

✅ LinkSee is now installed!

### 3. Pin it (recommended)

Click the **🧩 puzzle piece** icon in your toolbar → find **LinkSee** → click the **📌 pin** icon.

---

## 🚀 Usage

### Three ways to open the panel

| Method | How |
|---|---|
| 🖱️ Floating button | Round blue button in the bottom-right of any page |
| 🔧 Toolbar icon | Click the LinkSee icon in your toolbar |
| ⌨️ Keyboard shortcut | Press `Alt + L` on any page |

### Inside the panel

| Action | How |
|---|---|
| Search links | Type in the search bar (filters by text, URL or domain) |
| Filter by type | Dropdown: All / Internal / External / Anchors / Email / Phone / Files |
| Sort the list | Dropdown: Default / Text (A-Z) / URL (A-Z) / Length |
| Copy a link | Click the **📋** button on the link's row |
| Copy all visible | Click **📋 Copy all** in the header |
| Export to TXT | Click **⬇ TXT** — downloads a `.txt` file |
| Export to CSV | Click **⬇ CSV** — downloads a `.csv` file |
| Open a link | Click the URL (opens in a new tab) |
| Close the panel | Click **✖** or press `Esc` |

---

## ✨ Features

### Extraction
- 🔗 **Extracts all `<a>` tags** from the current page
- 🎯 **Automatic deduplication** — each unique URL appears only once
- 🌐 **Works on every website** (`http://` and `https://`)
- 🛡️ **Skips empty links** and `javascript:` placeholders
- 🔒 **Safe** — all content is escaped and rendered safely

### Browsing
- 🔍 **Real-time search** — filter by text, URL or domain
- 🎯 **Filter by type** — Internal, External, Anchors, Email, Phone, Files
- 📊 **Sort options** — by text (A-Z), URL (A-Z), or length
- 📈 **Live statistics** — count per link type in the stats bar

### Actions
- 📋 **One-click copy** for each link
- 📤 **Copy all** visible links at once
- 📥 **Export to TXT** — one URL per line
- 📊 **Export to CSV** — with columns: Text, URL, Type
- 🔓 **Opens links in a new tab** so you never lose your current page

### Interface
- 🎨 **Modern, clean UI**
- 🌗 **Automatic dark mode** — follows your system theme
- 🖼️ **Custom logo** on both the floating button and toolbar icon
- 🔢 **Link count badge** on the floating button
- 🍞 **Toast feedback** for every action
- 🪶 **Lightweight** — no external dependencies, no trackers

---

## ⌨️ Shortcuts

| Action | Key |
|---|---|
| Open / close the panel | `Alt + L` |
| Close the panel | `Esc` |
| Focus the search bar | `/` (when panel is open) |

---

## 🗂️ Project structure

```
LinkSee/
├── extension/              ← Extension source
│   ├── manifest.json
│   ├── background.js
│   ├── content.js
│   ├── icons/
│   │   ├── icon16.png
│   │   ├── icon48.png
│   │   └── icon128.png
│   └── README.md
├── LinkSee.zip             ← Ready-to-install build
├── LinkSee.user.js         ← Legacy userscript (v1.1)
├── LICENSE
└── README.md               ← This file
```

---

## 📜 History

LinkSee started as a Tampermonkey userscript (v1.0 → v1.1). Since v1.2, it's a full Chrome extension.

- **v1.2** (current) — Chrome extension build
- **v1.1** — Userscript with search, filters, sort, copy
- **v1.0** — Initial userscript release

---

## ❓ FAQ

**Is LinkSee on the Chrome Web Store?**
Not yet. You install it manually as an unpacked extension. A Web Store release may come in the future.

**Does it work on Firefox?**
Not for now — Manifest V3 has limited Firefox support. A Firefox version may come later.

**Does it work on every website?**
Yes, it runs on all `http://` and `https://` pages. Some protected pages (`chrome://`, Web Store) are blocked by the browser itself.

**Does it slow down pages?**
No. The script is passive until you open the panel. The link count is computed using `requestIdleCallback` so it never blocks the page.

**Is it safe?**
Yes. It only **reads** the links already present on the page. It sends nothing to any server and doesn't modify the page content.

**Can I use it on mobile?**
No. Chrome mobile doesn't support extensions.

**Why don't I see some links?**
Only `<a>` tags are extracted. Images, scripts, iframes and other elements may be supported in a future update.

**Can I export links?**
Yes — copy them, or export as `.txt` / `.csv`.

**Does it remove duplicate links?**
Yes. Each unique URL appears only once.

**The install link doesn't work, what do I do?**
Download the `LinkSee.zip` from the [latest release](https://github.com/AdrienPlaza/LinkSee/releases/latest), extract it, and load the folder in `chrome://extensions/`.

---

## 🤝 Contributing

Pull requests, ideas and bug reports are welcome!

If you find a bug or have a feature idea:
1. Open an [**issue**](https://github.com/AdrienPlaza/LinkSee/issues)
2. Or submit a [**Pull Request**](https://github.com/AdrienPlaza/LinkSee/pulls)

---

## ⚠️ Disclaimer

This extension is provided **for educational and personal purposes only**. Use at your own risk. The author is not responsible for any misuse.

---

## 📜 License

MIT License, free to use, modify, and share.
See the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**AdrienPlaza**

- 🎮 Passionate about programming, 3D, and VR
- 💻 Unity · Blender · Java · Python · JavaScript · HTML · C++ · Lua

---

⭐ If this extension helped you, don't forget to **star the repo**!
