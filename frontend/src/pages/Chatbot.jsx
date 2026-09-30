import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import { FaPaperPlane, FaLeaf, FaMicrophone, FaImage, FaTrash, FaTimes, FaRobot } from "react-icons/fa";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm Flora, your smart plant assistant. How can I help you today? 🌱", timestamp: new Date() }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const chatBoxRef = useRef(null);
  const fileInputRef = useRef(null);

  // Quick suggestion prompts
  const suggestions = [
    "🌱 How often should I water my plants?",
    "🌞 Best plants for low light",
    "🐛 Help with pest control",
    "💧 Signs of overwatering"
  ];

  // Check voice support on mount
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceSupported(false);
      console.warn("Speech recognition not supported in this browser");
    }
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (messageText = input) => {
    if (!messageText.trim() && !selectedImage) return;

    const userMsg = { 
      sender: "user", 
      text: messageText,
      image: selectedImage,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSelectedImage(null);
    setIsTyping(true);
    setShowSuggestions(false);

    // Simulate bot response delay
    setTimeout(async () => {
      try {
        const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";
        const res = await fetch(`${API_BASE}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            message: messageText,
            hasImage: !!selectedImage 
          }),
        });

        const data = await res.json();

        const botMsg = {
          sender: "bot",
          text: data.reply || "⚠️ I couldn't process that. Please try again.",
          timestamp: new Date()
        };

        setMessages((prev) => [...prev, botMsg]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          { 
            sender: "bot", 
            text: "❌ Connection error. Please check if the server is running.",
            timestamp: new Date()
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      setMessages([
        { sender: "bot", text: "Chat cleared! How can I help you today? 🌱", timestamp: new Date() }
      ]);
      setShowSuggestions(true);
    }
  };

  const startVoiceRecognition = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    alert("⚠️ Voice recognition is not supported in your browser.\n\nSupported browsers:\n• Chrome\n• Edge\n• Safari");
  }

    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => {
      setIsListening(true);
      console.log("🎤 Listening... Speak now!");
      // Optional: Add a toast notification
      setMessages((prev) => [
        ...prev,
        { sender: "system", text: "🎤 Listening... Speak now!", timestamp: new Date() }
      ]);
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("✅ Recognized:", transcript);
      setInput(transcript);
      setIsListening(false);
      // Remove the listening message
      setMessages((prev) => prev.filter(msg => msg.sender !== "system"));
    };
    
    recognition.onerror = (event) => {
      console.error("❌ Speech recognition error:", event.error);
      setIsListening(false);
      // Remove the listening message
      setMessages((prev) => prev.filter(msg => msg.sender !== "system"));
      
      let errorMessage = "";
      switch(event.error) {
        case 'not-allowed':
        case 'permission-denied':
          errorMessage = "🎤 Microphone access denied!\n\nPlease:\n1. Click the 🔒 lock icon in the address bar\n2. Allow microphone permissions\n3. Try again";
          break;
        case 'no-speech':
          errorMessage = "🔇 No speech detected. Please try again and speak clearly.";
          break;
        case 'network':
          errorMessage = "🌐 Network error. Please check your internet connection.";
          break;
        case 'not-allowed-https':
          errorMessage = "🔒 Voice input requires HTTPS.\n\nFor local development:\n• Use http://localhost:3000\n• Or enable HTTPS with: HTTPS=true npm start";
          break;
        default:
          errorMessage = `❌ Voice recognition error: ${event.error}\n\nTry:\n• Using Chrome or Edge\n• Allowing microphone access\n• Using localhost or HTTPS`;
      }
      alert(errorMessage);
    };
    
    recognition.onend = () => {
      setIsListening(false);
      console.log("🛑 Voice recognition ended");
      // Remove the listening message
      setMessages((prev) => prev.filter(msg => msg.sender !== "system"));
    };
    
    try {
      recognition.start();
    } catch (error) {
      console.error("Error starting recognition:", error);
      setIsListening(false);
      alert("❌ Could not start voice recognition.\n\nMake sure:\n• You're using Chrome, Edge, or Safari\n• Microphone permissions are granted\n• You're on localhost or HTTPS");
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-header-content">
          <div className="chat-icon">
            <FaLeaf />
          </div>
          <div className="chat-header-text">
            <h2 className="chat-title">Flora</h2>
            
          </div>
        </div>
        <button className="clear-chat-btn" onClick={clearChat} title="Clear chat">
          <FaTrash />
        </button>
      </div>

      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message-wrapper ${
              msg.sender === "user" 
                ? "user-wrapper" 
                : msg.sender === "system" 
                ? "system-wrapper" 
                : "bot-wrapper"
            }`}
          >
            {msg.sender === "bot" && (
              <div className="bot-avatar">
                <FaLeaf />
              </div>
            )}
            {msg.sender === "system" && (
              <div className="system-icon">
                <FaMicrophone />
              </div>
            )}
            <div className="message-content">
              <div className={
                msg.sender === "user" 
                  ? "user-msg" 
                  : msg.sender === "system" 
                  ? "system-msg" 
                  : "bot-msg"
              }>
                {msg.image && (
                  <img src={msg.image} alt="uploaded" className="chat-image" />
                )}
                {msg.text}
              </div>
              {msg.sender !== "system" && (
                <span className="message-time">{formatTime(msg.timestamp)}</span>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message-wrapper bot-wrapper">
            <div className="bot-avatar">
              <FaRobot className="bot-thinking" />
            </div>
            <div className="bot-msg typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {showSuggestions && messages.length === 1 && (
          <div className="suggestions-container">
            <p className="suggestions-title">Try asking:</p>
            <div className="suggestions-grid">
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  className="suggestion-btn"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="image-preview">
          <img src={selectedImage} alt="preview" />
          <button className="remove-image-btn" onClick={removeImage}>
            <FaTimes />
          </button>
        </div>
      )}

      <div className="chat-input-area">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
        
        <button 
          className="icon-btn" 
          onClick={() => fileInputRef.current?.click()}
          title="Upload image"
          disabled={isTyping}
        >
          <FaImage />
        </button>

        <button 
          className={`icon-btn ${isListening ? 'listening' : ''} ${!voiceSupported ? 'disabled' : ''}`}
          onClick={startVoiceRecognition}
          title={voiceSupported ? "Voice input (Click and speak)" : "Voice not supported"}
          disabled={isTyping || !voiceSupported}
        >
          <FaMicrophone />
        </button>

        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isListening ? "🎤 Listening..." : "Ask Flora about your plants..."}
          disabled={isTyping}
        />
        
        <button 
          className="chat-btn" 
          onClick={() => sendMessage()}
          disabled={isTyping || (!input.trim() && !selectedImage)}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}