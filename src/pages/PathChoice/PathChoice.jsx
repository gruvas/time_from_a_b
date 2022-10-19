import React from 'react';
import style from './PathChoice.module.scss'

import number_validation from '../../component/validation/number_validation'

import adding_minutes_date from '../../component/adding_minutes_date'
import conclusion_results from '../../component/conclusion_results'
import search_more_time from '../../component/search_more_time'
import date_correction from '../../component/date_correction'


const PathChoice = () => {
    // Узнаем часовой пояс, после чего
    // данный параметр делаем относительным 
    // московскому времени (прибавляем 3)
    let timezone = ((new Date().getTimezoneOffset()) / 60) + 3

    // У данного состояния есть три вариации 
    // (0: из А в В)
    // (1: из В в А)
    // (2: из A в B и обратно в А)
    const [direction, setDirection] = React.useState(0)

    // Количество билетов
    const [numberTickets, setNumberTickets] = React.useState(1)

    // Промежуточная переменная для вывода результата подсчета 
    const [calculationResult, setCalculationResult] = React.useState('Введите данные')
    
    // Сложение осуществляется, чтобы время отображалось 
    // в часовом поясе пользователя
    let intermediate_array = [
        {hour: 18+timezone, full_hours: 18+timezone, minute: 0, id: 0},
        {hour: 18+timezone, full_hours: 18+timezone, minute: 30, id: 1},
        {hour: 18+timezone, full_hours: 18+timezone, minute: 45, id: 2},
        {hour: 19+timezone, full_hours: 19+timezone, minute: 0, id: 3},
        {hour: 19+timezone, full_hours: 19+timezone, minute: 15, id: 4},
        {hour: 21+timezone, full_hours: 21+timezone, minute: 0, id: 5},
    ]
    // PS: данное нагромождение массива с объектами можно избежать 
    // (в данном тестовом задании я посчитал, что это будет не критично), 
    // если использовать базу данных и оттуда забирать данные объекты или 
    // вынести их в отдельный json файл, где будет храниться данные объекты.


    intermediate_array = date_correction(intermediate_array)
    
    const [arrDateA, setArrDateA] = React.useState(intermediate_array)

    intermediate_array = [
        {hour: 18+timezone, full_hours: 18+timezone, minute: 30, id: 0},
        {hour: 18+timezone, full_hours: 18+timezone, minute: 45, id: 1},
        {hour: 19+timezone, full_hours: 19+timezone, minute: 0, id: 2},
        {hour: 19+timezone, full_hours: 19+timezone, minute: 15, id: 3},
        {hour: 19+timezone, full_hours: 19+timezone, minute: 35, id: 4},
        {hour: 21+timezone, full_hours: 21+timezone, minute: 50, id: 5},
        {hour: 21+timezone, full_hours: 21+timezone, minute: 55, id: 6},
    ]

    intermediate_array = date_correction(intermediate_array)

    const [arrDateB, setArrDateB] = React.useState(intermediate_array)

    let copy_arr_b = intermediate_array

    // Основное время
    const [mainTime, setMainTime] = React.useState(arrDateA[0])
    // Время обратно
    const [backTime, setBackTime] = React.useState(arrDateB[0])    



    React.useEffect(() => {
        // Производит перерасчет при смене пути 
        if(direction == 2) {
            let intermediate = []

            let date_modified = adding_minutes_date(mainTime.full_hours, mainTime.minute, 50)

            let id = search_more_time(copy_arr_b, date_modified.getTime())
    
            for(let i = id; i < copy_arr_b.length; i++) {
                intermediate.push(copy_arr_b[i])
            }
    
            setBackTime(intermediate[0])
            setArrDateB(intermediate)
        } 
        
        if(direction == 1) {console.log(1)
            setArrDateB(copy_arr_b)
        }

    }, [direction, mainTime]);


    function btn_count() {
        setCalculationResult(conclusion_results(numberTickets, mainTime, backTime, direction))
    }
    

    return (
        <div>
            <header className={style.header}>
                <h1>
                    Выбор маршрута и времени
                </h1>

                <div>
                    <p>Стоимость в одну сторону: 700</p>
                    <p>Стоимость в обе стороные: 1200</p>
                    <p>Время в пути в одну сторону 50 минут.</p>
                </div>
            </header>

            <div className={style.dropdowns}>
                <div>
                    <label htmlFor="path">
                        Выберите путь
                    </label>

                    <div></div>

                    <select name="path" id="path">
                        <option value="из A в B" onClick={() => setDirection(0)}>из A в B</option>
                        <option value="из B в A" onClick={() => setDirection(1)}>из B в A</option>
                        <option value="из A в B и обратно в А" onClick={() => setDirection(2)}>из A в B и обратно в А</option>
                    </select>
                </div>


                <div className={direction == 1 ? 'hide' : ''}>
                    <label htmlFor="time">
                        Выбор времени из А в В
                    </label>

                    <div></div>

                    <select name="time" id="time">
                        {
                            arrDateA.map((element) => 
                                <option value={`${element.hour}:${element.minute == 0 ? '00' : element.minute}(из A в B)`} 
                                key={'dropdownA' + element.id}
                                onClick={() => setMainTime(element)}>
                                    {`${element.hour}:${element.minute == 0 ? '00' : element.minute}(из A в B)`}
                                </option>
                            )
                        }
                    </select>
                </div>

                <div className={direction == 0 ? 'hide' : ''}>
                    <label htmlFor="path_back">
                        Выбор времени из B в A
                    </label>

                    <div></div>

                    <select name="path_back" id="path_back">
                        {
                            arrDateB.map((element) => 
                                <option value={`${element.hour}:${element.minute == 0 ? '00' : element.minute}(из В в А)`} 
                                key={'dropdownB' + element.id}
                                onClick={() => setBackTime(element)}>
                                    {`${element.hour}:${element.minute == 0 ? '00' : element.minute}(из В в А)`}
                                </option>
                            )
                        }
                    </select>
                </div>
            </div>

            <div className={style.amount}>
                <label htmlFor="num">Количество билетов</label>
                <div></div>
                <input id="num" type="text" maxLength={2}
                onKeyPress={number_validation} 
                value={numberTickets} onChange={(e) => setNumberTickets(e.target.value)}/>
            </div>

            <button className={style.calculation_result} onClick={btn_count}>Посчитать</button>


            <div className={style.result}>
                <h2>
                    Результат заказа
                </h2>

                <div>
                    <p>
                        {calculationResult}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PathChoice;
