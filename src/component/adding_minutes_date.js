function adding_minutes_date(hour, minute, number) {
    let date = new Date()

    // Узнаем время большее выбранного времени на "number" минут
    return new Date(date.getFullYear(), date.getMonth(), date.getDay(), hour, (Number(minute) + Number(number)))
}

export default adding_minutes_date