# 🕒 Deal Timer Demo

A simple, modern **deal countdown timer** that persists across page reloads using `localStorage`.

---

## ✨ Features
- Set deal duration in minutes
- Starts countdown and persists between reloads
- Displays “Deal Over!” when time is over

---

## 🧠 Core Logic

The timer stores:
- `dealStart`: Unix timestamp (in seconds)
- `dealDuration`: Deal length in seconds

Then, every second:
```js
elapsed = now - dealStart
remaining = dealDuration - elapsed
```

If `remaining <= 0`, the deal expires.

---

## 🔧 Setup

1. Clone the repo:
    
    ```bash
    git clone https://github.com/ridd418/deal-timer.git
    cd deal-timer
    ```
    
2. Open `index.html` in your browser.
    

That’s it! 🎉

---

## 💡 Tech Stack

- **HTML5**
    
- **CSS3**
    
- **Vanilla JavaScript**

---