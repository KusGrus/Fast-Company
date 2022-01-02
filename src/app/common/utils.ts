import { ObjectDTO, QualitiesMap, QualityDTO } from '../../api/fake.api/api.model'

const monthArray: string[] = [
    'January',
    'February',
    'Match',
    'April',
    'May',
    'June',
    'Jule',
    'August',
    'September',
    'October',
    'November',
    'December'
]

function declOfNum(num: number, textForms: string[]): string {
    num = Math.abs(num) % 100
    const n = num % 10
    if (num > 10 && num < 20) {
        return textForms[2]
    }
    if (n > 1 && n < 5) {
        return textForms[1]
    }
    if (n === 1) {
        return textForms[0]
    }
    return textForms[2]
}

function convertQualities(qualities: QualitiesMap<QualityDTO>): ObjectDTO[] {
    return Object.keys(qualities).map(key => qualities[key])
}

function timeLeft(date: string | number): string {
    if (typeof date === 'string') {
        date = Number.parseInt(date)
    }
    const seconds = (Date.now() - date) / 1000
    const days = seconds / 60 / 60 / 24
    if (days >= 1) {
        const targetDate = new Date(date)
        const hhmm = `${targetDate.getHours()}:${targetDate.getMinutes()}`
        if (days < 2) {
            return `yesterday ${hhmm}`
        } else {
            const year = (days / 365) >= 1 ? ` ${targetDate.getFullYear()} ` : ' '
            return `${targetDate.getDate()}${year}${monthArray[targetDate.getMonth()].toLowerCase()} ${hhmm}`
        }
    } else {
        const info = {
            count: 0,
            entity: ''
        }
        if (seconds / 60 / 60 >= 1) {
            info.entity = 'hour'
            info.count = Math.round(seconds / 60 / 60)
        } else if (seconds / 60 >= 1) {
            info.entity = 'minute'
            info.count = Math.round(seconds / 60)
        } else {
            const roundedSeconds = Math.round(seconds)
            if (roundedSeconds < 5) {
                info.entity = 'moment'
            } else {
                info.entity = 'second'
                info.count = roundedSeconds
            }
        }
        return `${info.count || ''} ${info.entity + (info.count <= 1 ? '' : 's')} ago`.trim()
    }
}

function random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min)
}

function generateAvatar(): string {
    return `https://avatars.dicebear.com/api/avataaars/${(
        Math.random() + 1
    )
        .toString(36)
        .substring(7)}.svg`
}

export default {
    declOfNum,
    convertQualities,
    timeLeft,
    random,
    generateAvatar
}
