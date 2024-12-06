import React from 'react'
import styles from './NavBar.module.css'
import { data } from './config'
import GeraterArrow from '../../Icons/GeraterArrow'
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className={styles.root}>
            <div className={styles.contentWrapper}>
                {data.map((category, index) => (
                    <div className={styles.category} key={category.id}>
                        <Link to={category.link} className={styles.link}>
                            <div className={styles.element}>{category.item}</div>
                        </Link>
                        <div className={styles.icon}>
                            <GeraterArrow />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NavBar
