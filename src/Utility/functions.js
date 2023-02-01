export function isNew(itemDate, thereIsNews) {
    const now = new Date().getTime()
    const threeDays = 259200000
    // eslint-disable-next-line
    const oneDay = 86400000
    const ecart = now - itemDate
    thereIsNews = true

    return ecart < threeDays ? true : false && thereIsNews === false;
}