import React from 'react'
import Utils from '../../common/utils'
import { CompanyStateProps } from '../types'

const CompanyState = ({ total }: CompanyStateProps) => {
    const getClasses = (num: number) => {
        let color
        if (num >= 9) {
            color = 'success'
        } else if (num < 9 && num > 5) {
            color = 'info text-dark'
        } else if (num <= 5 && num > 0) {
            color = 'warning text-dark'
        } else {
            color = 'danger'
        }
        return `badge bg-${color} primary`
    }

    if (total) {
        const persons = Utils.declOfNum(total, ['человек', 'человека', 'человек'])
        const action = Utils.declOfNum(total, ['тусанет', 'тусанут', 'тусанут'])
        return (
            <h1 className={getClasses(total)}>
                {total} {persons} {action} с тобой сегодня!
            </h1>
        )
    } else {
        return (
            <h1 className={getClasses(total)}>
                Sorry, никто не тусанет с тобой today...
            </h1>
        )
    }
}

export default CompanyState
