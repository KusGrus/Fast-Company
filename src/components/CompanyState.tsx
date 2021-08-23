import React, {ReactNode} from 'react'
import {FastStateProps} from "./types"
import Utils from '../common/utils'

export class CompanyState extends React.Component<FastStateProps, any> {

    private getClasses(num: number): string {
        let color;
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

    render(): ReactNode {
        const count = this.props.count
        if (count) {
            const persons = Utils.declOfNum(count, ['человек', 'человека', 'человек'])
            const action = Utils.declOfNum(count, ['тусанет', 'тусанут', 'тусанут'])
            return (<h1 className={this.getClasses(count)}>{count} {persons} {action} с тобой сегодня!</h1>)
        } else {
            return (<h1 className={this.getClasses(count)}>Sorry, никто не тусанет с тобой today...</h1>)
        }
    }
}
