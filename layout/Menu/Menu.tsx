// @ts-ignore
import cn from 'classnames'
import styles from './Menu.module.css'
import React, {useContext} from 'react'
import {AppContext} from '../../context/app.context'
import {FirstLevelMenuItem, PageItem} from '../../interfaces/menu.interface'
import {firstLevelMenu} from '../../helpers/helper'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {motion} from 'framer-motion'
import {Variants} from 'framer-motion/types/types'

const Menu = (): JSX.Element => {
    const {menu, firstCategory, setMenu} = useContext(AppContext)
    const router = useRouter()

    const variants: Variants = {
        visible: {
            marginBottom: 20,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        },
        hidden: {
            marginBottom: 0
        }
    }

    const variantsChildren: Variants = {
        visible: {
            opacity: 1,
            height: 29
        },
        hidden: {
            opacity: 0,
            height: 0
        }
    }

    const openSecondLevel = (category: string) => {
        setMenu && setMenu(menu.map(m => {
            if (m._id.secondCategory === category) {
                m.isOpen = !m.isOpen
            }
            return {...m}
        }))

    }

    const buildFirstLevel = () => {
        return (
            <>{firstLevelMenu.map(m => (
                <div key={m.id}>
                    <Link href={m.route}>
                        <a>
                            <div
                                className={cn(styles['first-level'], {[styles['first-level-active']]: m.id === firstCategory})}>
                                {m.icon}
                                <span>{m.name}</span>
                            </div>
                        </a>
                    </Link>

                    {m.id === firstCategory && buildSecondLevel(m)}
                </div>
            ))}</>
        )
    }
    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return (
            <div className={styles['second-level-block']}>
                {menu.map(m => {
                    if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
                        m.isOpen = true
                    }
                    return (
                        <div key={m._id.secondCategory}>
                            <div className={styles['second-level']}
                                onClick={() => openSecondLevel(m._id.secondCategory)}>{m._id.secondCategory}</div>
                            <motion.div layout
                                variants={variants}
                                initial={m.isOpen ? 'visible': 'hidden'}
                                animate={m.isOpen ? 'visible': 'hidden'}
                                className={styles['third-level-block']}>
                                {buildThirdLevel(m.pages, menuItem.route)}
                            </motion.div>
                        </div>
                    )
                })}
            </div>
        )
    }
    const buildThirdLevel = (pages: PageItem[], route: string) => (
        pages.map(page => {
            const path = `/${route}/${page.alias}`
            return (
                <motion.div key={page.alias} variants={variantsChildren}>
                    <Link href={path}>
                        <a className={cn(styles['third-level'], {[styles['third-level-active']]: path === router.asPath})}>
                            {page.category}
                        </a>
                    </Link>
                </motion.div>
            )
        })
    )

    return (
        <div className="menu">
            {buildFirstLevel()}
        </div>
    )
}

export default Menu
