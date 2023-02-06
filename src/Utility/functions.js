const threeDays = 259200000;
// const oneDay = 86400000


    // fonction qui détermine si un item est nouveau ou pas
export function isNew(itemDate, thereIsNews) {
    const now = new Date().getTime()
    const threeDays = 259200000
    // eslint-disable-next-line
    const ecart = now - itemDate
    thereIsNews = true
// eslint-disable-next-line
    return ecart < threeDays ? true : false && thereIsNews === false;
}

    // fonction qui détermine si un item n'est bientôt plus nouveau
export function soonNotNew(itemDate) {
    const now = new Date().getTime()
    // eslint-disable-next-line
    const elapsed = now - itemDate
    return threeDays - elapsed > 3600000
        || !itemDate // if itemDate is null
        || threeDays - elapsed < 0; // if itemDate is in the past and revolute

}

    // fonction qui pour encore combien de temps est encore considéré comme nouveau
export function notNewAnymore(itemDate) {
    const now = new Date().getTime()
    const threeDays = 259200000
    // eslint-disable-next-line
    const elapsed = now - itemDate
    let leftToBeNew;
    leftToBeNew = (threeDays - elapsed)
    return formatDuration(leftToBeNew)
}

    // fonction qui convertit le "temps en ms" en "temps en jours, heures, minutes"
export function formatDuration(ms) {
    let date = new Date(ms);
    let jours = Math.floor(ms / (1000 * 60 * 60 * 24));
    let heures = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    if (jours <= 0 && heures <= 0) {
        return minutes + " min"
    }
    if (jours < 0) {
        return heures + " h" + minutes + " min"
    } else {
        return jours + " j " + heures + " h"
    }
}
