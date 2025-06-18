import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import TypingEffect from 'react-typing-effect';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [placeholderText, setPlaceholderText] = useState('');
    const { user, isAuthenticated, handleLogin, handleLogout } = useAuth();

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleTypingEffect = (text) => {
        setPlaceholderText(text);
    };

    return (
        <div className={styles.root}>
            <div className={styles.logo}>MedBuddy</div>
            <div className={styles.searchBar}>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleChange}
                        placeholder={placeholderText}
                        className={styles.input}
                    />
                    <TypingEffect
                        text={["Search...", "Find what you need!", "Type to search..."]}
                        speed={100}
                        eraseSpeed={50}
                        eraseDelay={500}
                        typingDelay={500}
                        onTyping={handleTypingEffect}
                        className={styles.typingText}
                    />
                </div>
            </div>
            {isAuthenticated ? (
                <div className={styles.loginContainer}>
                    <img src={user?.picture || '/default-avatar.png'} alt="Profile" className={styles.profilePic} />
                    <div onClick={handleLogout} className={styles.text}>
                        <strong>{user?.name || 'User'}</strong>
                        <p>{user?.email || 'No email provided'}</p>
                    </div>
                </div>
            ) : (
                <div className={styles.loginContainer}>
                    <div className={styles.profilePic}></div>
                    <div onClick={handleLogin} className={styles.text}>
                        Log In +
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
