// @ts-ignore
import cn from 'classnames'
import styles from './HhData.module.css'
import React from 'react'
import {HhDataProps} from './HhData.props'
import {Card} from '../Card/Card'
import HhRateIcon from '../../public/icons/hh-rate.svg'
import {price} from '../../helpers/helper'

export const HhData = ({count, juniorSalary, middleSalary, seniorSalary}: HhDataProps) => {
    return (
        <div className={styles.hh}>
            <Card className={styles.count}>
                <div className={styles.title}>Всего вакансий</div>
                <div className={styles['count-value']}>{count}</div>
            </Card>
            <Card className={styles.salary}>
                <div>
                    <div className={styles.title}>Начальный</div>
                    <div className={styles['salary-value']}>{price(juniorSalary)}</div>
                    <div className={styles['salary-rate']}>
                        <HhRateIcon className={styles.filled}/>
                        <HhRateIcon/>
                        <HhRateIcon/>
                    </div>
                </div>
                <div>
                    <div className={styles.title}>Средний</div>
                    <div className={styles['salary-value']}>{price(middleSalary)}</div>
                    <div className={styles['salary-rate']}>
                        <HhRateIcon className={styles.filled}/>
                        <HhRateIcon className={styles.filled}/>
                        <HhRateIcon/>
                    </div>
                </div>
                <div>
                    <div className={styles.title}>Профессионал</div>
                    <div className={styles['salary-value']}>{price(seniorSalary)}</div>
                    <div className={styles['salary-rate']}>
                        <HhRateIcon className={styles.filled}/>
                        <HhRateIcon className={styles.filled}/>
                        <HhRateIcon className={styles.filled}/>
                    </div>
                </div>

            </Card>
        </div>
    )
}
