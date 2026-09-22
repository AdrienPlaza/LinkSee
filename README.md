# 🔗 LinkSee

> A lightweight Tampermonkey userscript that extracts and displays all links from any webpage in a clean, floating interface.

![Version](https://img.shields.io/badge/version-1.0-blue)
![Platform](https://img.shields.io/badge/platform-Any%20website-green)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📥 Download

**[→ Install the script](https://github.com/AdrienPlaza/LinkSee/raw/refs/heads/main/LinkSee.user.js)**

*(Tampermonkey will automatically detect the userscript and offer to install it)*

---

## 📖 About

**LinkSee** is a userscript that adds a floating button to every webpage. Click it to instantly reveal **all links present on the page** in a clean, focused panel — no more digging through the HTML or the DevTools inspector.

Perfect for:
- 🔍 Quickly auditing links on a page
- 📋 Copying URLs without leaving the site
- 🕵️ Exploring a page's structure
- 💻 Developers debugging broken or hidden links

---

## ⚙️ Installation

1. Install the **Tampermonkey** extension for your browser:
   - [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/)
   - [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
2. Click on the **[→ Install the script](#-download)** link above. Tampermonkey should detect the userscript and offer to install it.
3. (Manual method) Alternatively, open the [`LinkSee.user.js`](./LinkSee.user.js) file in this repo, click the **Raw** button, then paste the content into a new Tampermonkey script.
4. Save with **Ctrl + S**.
5. Visit **any website** — a blue **🔗 See links** button appears at the bottom-right of the screen.

---

## 🚀 Usage

| Action | How |
|---|---|
| Reveal all links | Click the **🔗 See links** button |
| Open a link | Click on the URL in the list (opens in a new tab) |
| Close the panel | Click **Close ✖** in the panel header |
| Reopen | Click the floating button again |

---

## ✨ Features

- 🔗 **Extracts all `<a>` tags** from the current page
- 🎯 **Clean floating panel** with a list of clickable links
- 🚫 **Automatic deduplication** — each unique URL appears only once
- 📊 **Link counter** — shows how many unique links were found
- 🌐 **Works on every website** (`http://` and `https://`)
- 🖱️ **Floating button** always accessible at the bottom-right
- 🔓 **Opens links in a new tab** so you never lose your current page
- 🛡️ **Skips empty links** and `javascript:void(0)` placeholders
- 🪶 **Lightweight** — no external dependencies, no trackers
- 🔒 **Safe** — all URLs are HTML-escaped before display

---

## 🛠️ Configuration

You can customize the appearance by editing the styles inside the userscript. The main adjustable values:

```js
// Button position
bottom: 20px;   // Distance from bottom
right: 20px;    // Distance from right

// Button color
background-color: #007bff;  // Change to your preferred color
```

> 💡 A proper settings panel will be added in a future version.

---

## ❓ FAQ

**Does it work on every website?**
Yes, the script runs on all `http://` and `https://` pages thanks to the `@match *://*/*` directive.

**Does it slow down pages?**
No. The script only runs when you click the button. It's completely passive until then.

**Is it safe?**
Yes. The script only reads the links already present on the page. It doesn't send any data anywhere and doesn't modify the page content.

**Does it remove duplicate links?**
Yes. Since version 1.0, each unique URL is displayed only once.

**Can I use it on mobile?**
No. Tampermonkey on mobile doesn't reliably support userscripts.

**Why don't I see some links?**
The current version only extracts `<a>` tags. Other element types (images, scripts, iframes) may be supported in the future.

**Can I export the list of links?**
Not yet. This feature may come in a future update.

**The install link doesn't work, what do I do?**
Open the [`LinkSee.user.js`](./LinkSee.user.js) file in this repo, click the **Raw** button, copy the code, then paste it in a new Tampermonkey script.

---

## ⚠️ Disclaimer

This script is provided **for educational and personal purposes only**. Use at your own risk. The author is not responsible for any misuse.

---

## 🧩 Compatibility

| Browser | Status |
|---|---|
| Chrome | ✅ Tested by author |
| Edge | ✅ Tested by author |
| Brave | ✅ Tested by author |
| Firefox | ⚠️ Not tested |
| Opera / Vivaldi | ⚠️ Should work (Chromium-based) |
| Mobile | ❌ Not supported |

> If you test on another browser, feel free to open an issue and share the result.

---

## 🤝 Contributing

Pull requests, ideas and bug reports are welcome!

Feel free to open an **issue** or submit a **PR**.

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

⭐ If this script helped you, don't forget to **star the repo**!
