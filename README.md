![Powered by Google Gemini](assets/gemini-banner.svg)

# Gemini AI Chat Widget

A lightweight, responsive, and easily embeddable chat widget powered by **Google's Gemini 1.5 Flash** model.
Ideal for personal websites, portfolios, and static pages where conversational AI can enhance user experience.

## Features

- Floating chat widget positioned at the bottom-right corner
- Real-time AI responses using Gemini 1.5 Flash
- Minimalist, clean UI with message bubbles
- Responsive design suitable for all devices
- Simple setup with no external frameworks
- Easy integration into any existing website

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sudeerzurumlu/WebChat_with_Gemini-AI.git
cd ai-chat-gemini
```

### 2. Add Your Gemini API Key

- Open `script.js` and replace `YOUR_GEMINI_API_KEY_HERE` with your actual Gemini API key.
- You can obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

```
const API_KEY = "YOUR_GEMINI_API_KEY_HERE";
```

### 3. Deploy or Open Locally

- Open `index.html` in your browser, or
- Deploy to GitHub Pages for free static hosting.

## File Structure

```
WebChat_with_Gemini-AI/
├── index.html
├── style.css
├── script.js
├── assets/
│   └── gemini-icon.svg
├── README.md
```

## Usage

- Click the floating Gemini icon to open the chat.
- Type your message and press Enter or click Send.
- AI responses will appear in real time.

## Customization

- Edit `style.css` for color, size, or animation changes.
- Replace `assets/gemini-icon.svg` with your own icon if desired.

## License

MIT
