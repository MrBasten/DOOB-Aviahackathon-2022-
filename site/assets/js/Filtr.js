function filterByTime(startTime, finishTime) {

    let filteredCards = CATALOG.filter((card) => {
        const cardTimeStart = Number(card.time_start.split(":")[0]);
        const cardTimeFinish = Number(card.time_start.split(":")[0]);
        return startTime <= cardTimeStart && finishTime > cardTimeFinish
    })

    return filteredCards;

}