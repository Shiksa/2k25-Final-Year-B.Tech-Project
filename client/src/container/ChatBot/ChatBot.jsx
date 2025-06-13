import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You need a backend API route to handle OpenAI call
import styles from './ChatBot.module.css'; // Optional CSS module
import ReactMarkdown from 'react-markdown';
import { FaPaperPlane } from 'react-icons/fa';


const ChatBot = () => {
  const introMessage = `Hi! I’m Med-Buddy, just an AI chatbot here to offer basic health tips and home remedies. I am not 100% accurate, and I'm not a real doctor. For any serious problem, please consult a medical professional.`;

  // const [messages, setMessages] = useState(() => {
  //   return JSON.parse(sessionStorage.getItem("chat")) || [
  //     { sender: 'bot', text: introMessage }
  //   ];
  // });

  const [messages, setMessages] = useState([
    { sender: 'bot', text: introMessage }
  ]);


  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // useEffect(() => {
  //   sessionStorage.setItem("chat", JSON.stringify(messages));
  // }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chat-bot/chat', {
        message: input
      });

      const botMsg = { sender: 'bot', text: res.data.reply };

      setTimeout(() => {
        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
      }, 1000);

    } catch (err) {
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: "Something went wrong. Please try again later."
      }]);
      setIsTyping(false);
    }
  };

  const handleCloseChat = () => {
    setMessages([]);
    sessionStorage.removeItem("chat");
  };

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.header}>
        MedBuddy ChatBot
        {/* <button onClick={handleCloseChat}>X</button> */}
      </div>

      <div className={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${styles.message} ${msg.sender === 'user' ? styles.user : styles.bot}`}
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}

        {isTyping && <div className={styles.typing}>MedBuddy is typing...</div>}
      </div>

      <div className={styles.inputArea}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          className={styles.input}
          placeholder="Type your issues..."
        />
        <FaPaperPlane className={styles.sendIcon} onClick={handleSend} />
      </div>
    </div>
  );
};

export default ChatBot;
