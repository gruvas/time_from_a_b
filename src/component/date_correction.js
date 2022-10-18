
// Исправляем количество часов для отображение в dom дереве
// (не допускаем возможность появления в переменной количества большего 24)
function date_correction(arr) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].hour >= 24) {
            arr[i].hour = arr[i].hour - 24
        }
    }
    
    return arr
}

export default date_correction