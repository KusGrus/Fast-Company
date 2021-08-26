function declOfNum(num: number, text_forms: string[]): string {
    num = Math.abs(num) % 100
    const n = num % 10
    if (num > 10 && num < 20) {
        return text_forms[2]
    }
    if (n > 1 && n < 5) {
        return text_forms[1]
    }
    if (n === 1) {
        return text_forms[0]
    }
    return text_forms[2]
}

export default {
    declOfNum
}
