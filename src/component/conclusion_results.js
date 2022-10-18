import adding_minutes_date from './adding_minutes_date'

function conclusion_results(numberTickets, mainTime, backTime, direction) {
    if(isNaN(numberTickets)) {
        alert('Неверный тип введенных данных')
    } else {
        if(numberTickets && numberTickets != 0) {
            let calculation_result = ''

            let result, route
            let arrival_time
            let travel_time = 50
            
            if(direction == 2) {
                result = 1200 * numberTickets
                route = 'из "A" в "B" и обратно в "А"'
                arrival_time = adding_minutes_date(mainTime.hour, mainTime.minute, 50)
                
                let tour_start_date = adding_minutes_date(mainTime.hour, mainTime.minute, 0)
                let tour_end_date = adding_minutes_date(backTime.hour, backTime.minute, 50)

                travel_time = (tour_end_date - tour_start_date)/1000/60


                calculation_result = `Вы выбрали ${numberTickets} билета по маршруту ${route} стоимостью ${result}р.
                Это путешествие займет у вас ${travel_time} минут. 
                Теплоход отправляется из "А" в "В" ${mainTime.hour}-${mainTime.minute == 0 ? '00' : mainTime.minute}, прибудет в ${arrival_time.getHours()}-${arrival_time.getMinutes() == 0 ? '00' : arrival_time.getMinutes()}. 
                Отправляется из "В" в "А" ${backTime.hour}-${backTime.minute == 0 ? '00' : backTime.minute}, прибудет в ${tour_end_date.getHours()}-${tour_end_date.getMinutes() == 0 ? '00' : tour_end_date.getMinutes()}.`

                return calculation_result
            } else {
                result = 700 * numberTickets

                if(direction == 1) {
                    route = 'из "B" в "A"'
                    arrival_time = adding_minutes_date(backTime.hour, backTime.minute, 50)

                    calculation_result = `Вы выбрали ${numberTickets} билета по маршруту ${route} стоимостью ${result}р.
                    Это путешествие займет у вас ${travel_time} минут. 
                    Теплоход отправляется в ${backTime.hour}-${backTime.minute == 0 ? '00' : backTime.minute}, а прибудет в ${arrival_time.getHours()}-${arrival_time.getMinutes() == 0 ? '00' : arrival_time.getMinutes()}.`
                }

                if(direction == 0) {
                    route = 'из "A" в "B"'
                    arrival_time = adding_minutes_date(mainTime.hour, mainTime.minute, 50)

                    calculation_result = `Вы выбрали ${numberTickets} билета по маршруту ${route} стоимостью ${result}р.
                    Это путешествие займет у вас ${travel_time} минут. 
                    Теплоход отправляется в ${mainTime.hour}-${mainTime.minute == 0 ? '00' : mainTime.minute}, а прибудет в ${arrival_time.getHours()}-${arrival_time.getMinutes() == 0 ? '00' : arrival_time.getMinutes()}.`
                }
            
                return calculation_result
            }
        } else {
            alert('Необходимо указать количество билетов')
        }
    }

    return 'Введены некорректные данные'
}

export default conclusion_results