# Shankar Lashkare — Developer Portfolio

A clean, minimalist, mobile-first developer portfolio built with semantic HTML5, modern CSS3, and vanilla JavaScript.

## Features

- **White, Dark & System Themes:** Pure white default theme with seamless switching between White (`light`), Dark (`dark`), and OS-synced `system` modes.
- **White-Background Portrait Framing:** Preserves `assets/shankar-lashkare.jpg` in a crisp white frame across all themes.
- **Responsive Mobile-First Layout:** Optimized for phones (iOS/Android), tablets, laptops, and desktops with a working mobile hamburger menu.
- **Editable Configuration:** Centralized placeholders in `js/main.js` (`PORTFOLIO_CONFIG`) for email, resume PDF (`assets/Shankar-Lashkare-Resume.pdf`), GitHub, LeetCode, LinkedIn, and repository links.
- **Accessible & Zero Dependencies:** Semantic HTML landmarks, keyboard/Escape handling, reduced-motion support, SEO/Open Graph tags, and SVG `SL.` favicon.

## Project Structure

- `index.html` — Semantic page structure & SEO/Open Graph metadata
- `css/style.css` — Design tokens, theme overrides, and responsive layout
- `js/main.js` — Theme switcher, mobile navigation, scroll reveal, skill filters, resume & contact handlers
- `assets/shankar-lashkare.jpg` — Profile portrait
- `robots.txt` & `sitemap.xml` — Search engine directives

## Local Preview

```bash
python -m http.server 8080
```

Then open `http://localhost:8080/` in your browser.
