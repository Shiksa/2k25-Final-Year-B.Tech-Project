import React, { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header/Header';
import NavBar from '../NavBar/NavBar';
import styles from '../Home/Home.module.css';
import HeroTabSection from '../HeroTabSection/HeroTabSection';
import MarqueeText from '../../components/MarqueeText/MarqueeText';
import FeatureSection from '../../components/FeatureSection/FeatureSection';
import ChatBot from '../ChatBot/ChatBot';
import { FaTimes } from 'react-icons/fa';

const Home = () => {
    const [showChat, setShowChat] = useState(false);
    const chatRef = useRef(null);

    const toggleChat = () => {
        setShowChat(prev => !prev);
    };

    const handleClickOutside = (event) => {
        if (chatRef.current && !chatRef.current.contains(event.target)) {
            setShowChat(false);
        }
    };

    useEffect(() => {
        if (showChat) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showChat]);

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <NavBar />
                <div className={styles.heroSection}>
                    <HeroTabSection />
                    <MarqueeText
                        text="Your B.Tech 2k25 Final Year Project Deadline is on 16th of December"
                        speed={1}
                        direction="left"
                        pauseOnHover={true}
                        className={styles.marqueeTextDiv}
                    />
                    <FeatureSection />
                </div>

                {/* Floating Logo Button */}
                <div className={styles.chatbotWrapper} onClick={toggleChat}>
                    <svg viewBox="0 0 200 200" className={styles.svgText}>
                        <defs>
                            <path
                                id="circlePath"
                                d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
                            />
                        </defs>
                        <text>
                            <textPath href="#circlePath" startOffset="0%">
                                Med-Buddy Chat bot || Suggest Home-Remedies || &nbsp; &nbsp; Med-Buddy AI Chat bot || Suggest Home-Remedies ||
                            </textPath>
                        </text>
                    </svg>
                    <img
                        src="/ai_medical_chatbot_logo.png"
                        alt="ChatBot Logo"
                        className={styles.chatbotLogo}
                    />
                </div>

                {/* Floating ChatBox */}
                {showChat && (
                    <div className={styles.chatPopupContainer}>
                        <FaTimes
                            className={styles.closeIcon}
                            onClick={toggleChat}
                        />
                        <div className={styles.chatPopup} ref={chatRef}>
                            <ChatBot />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
