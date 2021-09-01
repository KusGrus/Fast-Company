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

export default {
    declOfNum
}
