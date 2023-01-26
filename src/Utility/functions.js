export function isNew(itemDate) {
    const now = new Date().getTime()
    const threeDays = 259200000
    const ecart = now - itemDate

    return ecart < threeDays ? true : false;
}