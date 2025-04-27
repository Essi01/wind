# WIND Browser - Quick Start Guide

## How to Start

```bash
# 1. Install dependencies
npm install

# 2. Start the browser
npm start




# Main Functions in WIND Browser

| Function             | Description |
|:---------------------|:------------|
| **Startpage**         | Loads a local start page with a search bar for DuckDuckGo. |
| **Tabs**              | Opens websites in separate, switchable tabs inside the same window. |
| **Bookmarks**         | Save and manage your favorite pages. Stored in `/src/data/bookmarks.json`. |
| **History**           | Automatically records visited websites. Stored in `/src/data/history.json`. |
| **Private Mode**      | Disables cache, cookies, and tracking for private browsing. |
| **Import Bookmarks**  | Allows importing bookmarks from Chrome, Firefox and other browsers (`.html` export file). |
| **Save Current Page** | Quickly saves the currently active tab to bookmarks without typing the URL manually. |
| **View Bookmarks**    | Opens a bookmarks page where all saved bookmarks are listed and clickable. |
| **View History**      | Opens a history page showing visited websites (planned feature for improved UI). |

---

## Notes
- Bookmarks and history are stored as local JSON files.
- Everything works offline except real web page loading.
- Easy to extend with features like download manager or adblocker later.
