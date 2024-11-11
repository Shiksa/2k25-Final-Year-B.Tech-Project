import React from 'react'
import styles from './NavBar.module.css'
import { data } from './config'
import GeraterArrow from '../../Icons/GeraterArrow'

const NavBar = () => {
    return (
        <div className={styles.root}>
            <div className={styles.contentWrapper}>
                {data.map((category, index) => (
                    <div className={styles.category} key={category.id}>
                        <div className={styles.element}>{category.item}</div>
                        <div className={styles.icon}> <GeraterArrow/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NavBar
