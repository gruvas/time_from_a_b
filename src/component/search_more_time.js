import adding_minutes_date from './adding_minutes_date'

// Данным методом определяем id времени из "В в А" 
// которое больше выбранного времени из "А в В"
// при выборе пути "из A в B и обратно в А"
function search_more_time(arr, date_time) {
    let element_time

    for(let i = 0; i < arr.length; i++) {
        element_time = adding_minutes_date(arr[i].full_hours, arr[i].minute, 0)

        if(element_time.getTime() > date_time) {
            return arr[i].id
        }
    }
}

export default search_more_time