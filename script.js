// =============================
// Gemini AI Chat Widget Script
// =============================

// TODO: Replace with your actual Gemini API key
const API_KEY = "YOUR_GEMINI_API_KEY_HERE";

// Gemini API endpoint
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// DOM Elements
const chatWidget = document.getElementById('gemini-chat-widget');
const chatToggleBtn = document.getElementById('chat-toggle-btn');
const chatCloseBtn = document.getElementById('chat-close-btn');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

// Load config
// Load Gemini config from config.js
const CONFIG = window.GEMINI_CONFIG || {
  aiName: "Gemini",
  systemPrompt: "You are a helpful, friendly, and concise AI assistant.",
  themeColor: "#3b82f6",
  welcomeMessage: "Hi! How can I help you?"
};

// Open the chat widget
function openChat() {
  chatWidget.classList.add('open');
  chatToggleBtn.style.display = 'none';
  chatInput.focus();
}

// Close the chat widget
function closeChat() {
  chatWidget.classList.remove('open');
  chatToggleBtn.style.display = 'flex';
}

// Converts simple markdown (bold, italic, inline code) to HTML
function markdownToHtml(text) {
  // Bold: **text** or __text__
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__(.*?)__/g, '<strong>$1</strong>');
  // Italic: *text* or _text_
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  text = text.replace(/_(.*?)_/g, '<em>$1</em>');
  // Inline code: `code`
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  return text;
}

// Add a message bubble to the chat
function addMessage(text, sender = 'user') {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  if (sender === 'ai') {
    msgDiv.innerHTML = markdownToHtml(text);
  } else {
    msgDiv.textContent = text;
  }
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send user message to Gemini API and handle response
async function sendMessageToGemini(userInput) {
  try {
    // Show user message
    addMessage(userInput, 'user');
    // Show loading indicator for AI response
    const loadingMsg = document.createElement('div');
    loadingMsg.className = 'message ai';
    loadingMsg.textContent = CONFIG.aiName + ' is typing...';
    chatMessages.appendChild(loadingMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Prepare API request with system prompt
    const contents = [];
    if (CONFIG.systemPrompt) {
      contents.push({ role: 'user', parts: [{ text: CONFIG.systemPrompt }] });
    }
    contents.push({ role: 'user', parts: [{ text: userInput }] });

    const res = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ contents })
    });

    // Parse response
    const data = await res.json();
    // Remove loading indicator
    chatMessages.removeChild(loadingMsg);
    // Extract Gemini's reply
    const geminiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "An error occurred. Please try again.";
    addMessage(geminiReply, 'ai');
  } catch (error) {
    // Remove loading indicator if present
    const loading = chatMessages.querySelector('.message.ai:last-child');
    if (loading && loading.textContent.endsWith('is typing...')) {
      chatMessages.removeChild(loading);
    }
    addMessage("Failed to connect to Gemini API.", 'ai');
    console.error('Gemini API error:', error);
  }
}

// Handle chat form submission
chatForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const userInput = chatInput.value.trim();
  if (!userInput) return;
  chatInput.value = '';
  sendMessageToGemini(userInput);
});

// Open/close widget events
chatToggleBtn.addEventListener('click', openChat);
chatCloseBtn.addEventListener('click', closeChat);

// Optional: Open chat with Enter if toggle button is focused
chatToggleBtn.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    openChat();
  }
});

// Optional: Close chat with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && chatWidget.classList.contains('open')) {
    closeChat();
  }
});

// Auto-scroll to bottom on new message
const observer = new MutationObserver(() => {
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
observer.observe(chatMessages, { childList: true });

// Hide widget on load (for graceful appearance)
window.addEventListener('DOMContentLoaded', () => {
  // Set AI name in header
  const headerSpan = document.querySelector('.chat-header span');
  if (headerSpan) headerSpan.textContent = CONFIG.aiName + ' AI Chat';
  // Set theme color
  document.documentElement.style.setProperty('--primary', CONFIG.themeColor);
  // Show welcome message
  if (CONFIG.welcomeMessage) {
    addMessage(CONFIG.welcomeMessage, 'ai');
  }
  chatWidget.classList.remove('open');
  chatToggleBtn.style.display = 'flex';
}); 