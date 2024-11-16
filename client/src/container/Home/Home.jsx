import React from 'react'
import Header from '../../components/Header/Header'
import NavBar from '../NavBar/NavBar'
import styles from '../Home/Home.module.css'
import HeroTabSection from '../HeroTabSection/HeroTabSection'
import MarqueeText from '../../components/MarqueeText/MarqueeText'
import FeatureSection from '../../components/FeatureSection/FeatureSection'

const Home = () => {
    return (
        <div className={styles.root}>
            <Header />
            <div className={styles.container}>
                <NavBar />
                <div className={styles.heroSection}>
                    <HeroTabSection />
                    <MarqueeText />
                    <FeatureSection/>
                </div>
                </div>
        </div>
    )
}

export default Home
