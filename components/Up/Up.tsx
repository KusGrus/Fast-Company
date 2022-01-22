import React, {useCallback, useEffect, useMemo} from 'react'
import styles from './Up.module.css'
import UpIcon from '../../public/icons/arrow-up.svg'
import useScrollY from '../../hooks/useScrollY'
import {useAnimation, motion} from 'framer-motion'

export const Up = () => {
    const y = useScrollY()
    const controls = useAnimation()

    const initial = useMemo(() => ({
        opacity: 0
    }), [])

    useEffect(() => {
        controls.start({opacity: y > window.innerHeight ? 1 : 0}).then()
    }, [y, controls])

    const scrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    return (
        <motion.button className={styles.up}
            animate={controls}
            initial={initial}
            onClick={scrollToTop}>
            <UpIcon/>
        </motion.button>
    )
}
