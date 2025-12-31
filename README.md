# Deal Timer ⏳

## Overview

A modern **deal countdown timer** built with **HTML, CSS, and Vanilla JavaScript**.

The app implements a simple time-based deal mechanic commonly seen in e-commerce,
but is intentionally designed with a focus on **architecture, state management,
and modular JavaScript**, rather than UI complexity.

---

## Why this project exists

This project is **not** about building a visually impressive countdown timer.

It exists as a focused experiment in treating frontend JavaScript as a **system**
rather than a collection of scripts.

The goal was to:
- design a reusable timer engine independent of the DOM
- model time-based state in a way that survives page reloads
- separate persistence, domain logic, and UI concerns cleanly
- explore how far architectural clarity can go without frameworks or build tools

The resulting code reflects lessons learned through refactoring and iteration,
not an attempt to produce the shortest or simplest implementation.

The minimal UI is intentional — it keeps attention on **structure, boundaries,
and data flow**, not presentation.

---

## 🧠 Engineering Focus

This project focuses on **how** the timer is built, not just **what** it does.

Key engineering goals:

- Treat time as a source of truth
- Isolate countdown logic from the DOM
- Encapsulate persistence behind a small API
- Keep the app entry point as an orchestration layer
- Make core logic reusable outside this specific UI

The code is written to be **read**, **reasoned about**, and **extended**, rather
than optimized for brevity.

---

## 🏗️ Architecture Overview

```
script.js (app orchestrator)
  ├─ handles user events
  ├─ maps domain state → UI
  ├─ coordinates modules
  │
  ├─ timer.js (domain logic)
  │    ├─ owns countdown mechanics
  │    ├─ tracks remaining time
  │    └─ exposes a small public API
  │
  └─ stateStore.js (persistence)
       ├─ stores start timestamp + duration
       ├─ computes remaining time on load
       └─ abstracts localStorage access
```

**Key idea:**  
The UI never calculates time or deal state directly.  
All time-based decisions flow through the timer and persistence layers.

---

## 🧩 Design Decisions

### 1. Timestamp-based persistence instead of ticking state
Rather than storing “seconds remaining”, the app stores:
- when the deal started
- how long it should last

This allows the timer to:
- survive page reloads
- remain accurate across browser restarts
- avoid drift caused by paused or throttled intervals

---

### 2. DOM-agnostic timer module
`timer.js` contains no DOM access.

It:
- owns countdown mechanics
- exposes a small API (`start`, `reset`, `isRunning`)
- communicates via callbacks

This makes the timer reusable in:
- different UIs
- tests
- non-browser environments

---

### 3. Thin orchestration layer
`script.js` acts as a coordinator, not a logic container.

It:
- listens for user interactions
- calls module APIs
- updates the DOM based on returned state

It does **not**:
- calculate time
- enforce deal rules
- manage persistence logic

---

### 4. Explicit deal state modeling
Deal states (*Not Started*, *Live*, *Over*) are treated as explicit domain concepts,
not inferred implicitly from UI conditions.

This improves:
- readability
- debuggability
- future extensibility

---

## 🎯 Features

- Configurable deal duration (in minutes)
- Persistent countdown across reloads
- Clear deal states: *Not Started*, *Live*, *Deal Over*
- Timestamp-based accuracy
- Reset control with state cleanup
- Clean, responsive UI

---

## 🖥️ Demo

Live demo:  
<a href="https://ridd418.github.io/deal-timer/" target="_blank" rel="noopener noreferrer">
https://ridd418.github.io/deal-timer/
</a>

---

## 🧠 How It Works

Instead of relying on an in-memory countdown, the app stores **when the deal started**
and **how long it lasts**.

### Stored State (`localStorage`)
```js
{
  start: Date.now(),   // timestamp in milliseconds
  duration: seconds   // total deal duration
}
```

### On Page Load
```js
secondsPassed = now - start
secondsLeft   = duration - secondsPassed
```

- If `secondsLeft > 0` → resume countdown
- If `secondsLeft <= 0` → mark deal as over

> Note: There may be a sub-second delay when resuming after reload, which is
> generally negligible in real-world usage.

---

## 💡 Use Cases

- Flash sales / limited-time offers
- Promotional countdowns
- E-commerce deal banners
- Frontend architecture demonstrations

---

## 🛠️ Tech Stack

- HTML5
- CSS3 (modern variables, responsive layout)
- JavaScript (ES6 modules)

No frameworks.  
No build step.  
Just modern web fundamentals.

---

## 📂 Installation

1. Clone the repository:

```bash
git clone https://github.com/ridd418/deal-timer.git
cd deal-timer
```

2. Install **Docker** and **Docker Compose**

3. Run the project:

```bash
docker compose up -d
```

4. Open <a href="http://localhost:4000/" target="_blank" rel="noopener noreferrer">http://localhost:4000</a> in your browser

**Clean up:**

```bash
docker compose down
```

---

## 📸 Screenshot

![Deal Timer Screenshot](media/screenshot.png)

---

## 📝 License

This project is licensed under the **MIT License**.  
See [LICENSE](LICENSE) for details.
