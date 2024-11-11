import React from 'react'
import styles from './Header.module.css'

const Header = () => {
    return (
        <div className={styles.root}>
<div className={styles.logo}>MedBuddy</div>
<div className={styles.searchBar}></div>
<div className={styles.loginContainer}></div>
        </div>
    )
}

export default Header
