# 🔗 LinkSee

> A lightweight Tampermonkey userscript that extracts, browses and manages all links from any webpage — with search, filters, sorting, and one-click copy.

![Version](https://img.shields.io/badge/version-1.1-blue)
![Platform](https://img.shields.io/badge/platform-Any%20website-green)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📥 Download

**[→ Install the script](https://github.com/AdrienPlaza/LinkSee/releases/download/v1.1/LinkSee.user.js)**

*(Tampermonkey will automatically detect the userscript and offer to install it)*

> 💡 If the link doesn't work, you can also manually install the script from the [`LinkSee.user.js`](./LinkSee.user.js) file in this repo.

---

## 📖 About

**LinkSee** is a userscript that adds a floating button to every webpage. Click it to instantly reveal **all links present on the page** in a clean, focused panel — with powerful tools to search, filter, sort, and copy them.

Perfect for:
- 🔍 Quickly auditing links on a page
- 📋 Copying URLs without leaving the site
- 🕵️ Exploring a page's structure
- 💻 Developers debugging broken or hidden links
- 📊 Analyzing link types (internal, external, files, emails…)

---

## ⚙️ Installation

1. Install the **Tampermonkey** extension for your browser:
   - [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/)
   - [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
2. Click on the **[→ Install the script](#-download)** link above. Tampermonkey should detect the userscript and offer to install it.
3. (Manual method) Alternatively, open the [`LinkSee.user.js`](./LinkSee.user.js) file in this repo, click the **Raw** button, then paste the content into a new Tampermonkey script.
4. Save with **Ctrl + S**.
5. Visit **any website** — a round **🔗 button** appears at the bottom-right of the screen.
6. Click the button (or press `Alt+L`) to open the LinkSee panel.

---

## 🚀 Usage

| Action | How |
|---|---|
| Open the panel | Click the floating 🔗 button **or** press `Alt+L` |
| Search links | Type in the search bar (filters by text or URL) |
| Filter by type | Use the dropdown: All / Internal / External / Anchors / Email / Phone / Files |
| Sort the list | Use the sort dropdown: Default / Text / URL / Length |
| Copy a link | Click the **📋** button on the link's row |
| Copy all visible links | Click **📋 Copy all** in the header |
| Open a link | Click on the URL (opens in a new tab) |
| Close the panel | Click the **✖** button **or** press `Esc` |

---

## ✨ Features

### Extraction
- 🔗 **Extracts all `<a>` tags** from the current page
- 🎯 **Automatic deduplication** — each unique URL appears only once
- 🌐 **Works on every website** (`http://` and `https://`)
- 🛡️ **Skips empty links** and `javascript:void(0)` placeholders
- 🔒 **Safe** — all URLs are HTML-escaped before display

### Browsing
- 🔍 **Real-time search** — filter links by text or URL as you type
- 🎯 **Filter by type** — Internal, External, Anchors, Email, Phone, Files
- 📊 **Sort options** — by text (A-Z), URL (A-Z), or length
- 📈 **Live statistics** — count per link type in the stats bar

### Actions
- 📋 **One-click copy** for each link
- 📤 **Copy all** visible links at once
- 🔓 **Opens links in a new tab** so you never lose your current page

### Interface
- 🎨 **Modern UI** — clean, animated, easy on the eyes
- ⌨️ **Keyboard shortcuts** — `Alt+L` to open/close, `Esc` to close
- 🍞 **Toast feedback** — visual confirmation on every action
- 🪶 **Lightweight** — no external dependencies, no trackers

---

## ⌨️ Shortcuts

| Action | Key |
|---|---|
| Open / close panel | `Alt + L` |
| Close panel | `Esc` |
| Focus search | Click the search bar |

---

## 🛠️ Configuration

You can customize the appearance by editing the styles inside the userscript. The main adjustable values:

```js
const CONFIG = {
    accentColor: '#007bff',    // Change to your preferred color
    accentHover: '#0056b3',    // Hover color
};
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
Yes. Each unique URL is displayed only once.

**Can I filter links by type?**
Yes. Use the dropdown menu in the toolbar to filter by: Internal, External, Anchors, Email, Phone, or Files.

**Can I sort the list?**
Yes. Use the sort dropdown to sort by text (A-Z), URL (A-Z), or length.

**Can I copy all links at once?**
Yes. Click the **📋 Copy all** button in the header. It copies the currently visible (filtered) links.

**How do I search links?**
Type in the search bar. It filters by link text OR URL in real time.

**Can I use it on mobile?**
No. Tampermonkey on mobile doesn't reliably support userscripts.

**Why don't I see some links?**
The current version only extracts `<a>` tags. Other element types (images, scripts, iframes) may be supported in the future.

**Can I export the list of links?**
Not yet. This feature may come in a future update.

**The install link doesn't work, what do I do?**
Two options:
1. Use the **release link** in the Download section above.
2. Open the [`LinkSee.user.js`](./LinkSee.user.js) file in this repo, click **Raw**, copy the code, then paste it in a new Tampermonkey script.

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
