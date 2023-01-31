export function isNew(itemDate, thereIsNews) {
    const now = new Date().getTime()
    const threeDays = 259200000
    const ecart = now - itemDate
    thereIsNews = true

    return ecart < threeDays ? true : false && thereIsNews === false;
}