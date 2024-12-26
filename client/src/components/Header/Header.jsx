import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import TypingEffect from 'react-typing-effect';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [placeholderText, setPlaceholderText] = useState('');
    const { loginWithRedirect, user, isAuthenticated, isLoading, logout } = useAuth0();

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleTypingEffect = (text) => {
        setPlaceholderText(text);
    };

    const handleLogout = () => {
        logout({ returnTo: window.location.origin });
        console.log('Logout initiated...');
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
                    <img src={user.picture} alt="Profile" className={styles.profilePic} />
                    <div onClick={handleLogout} className={styles.text}>{user.name}
                        <p>{user.email}</p>
                    </div>
                </div>) : (
                <div className={styles.loginContainer}>
                    <div className={styles.profilePic}></div>
                    <div onClick={() => loginWithRedirect()} className={styles.text}>Log In +</div>
                </div>)}
        </div>);
};

export default Header;
