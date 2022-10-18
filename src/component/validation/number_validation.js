// Вызывается при вводе в input символов
// Блокирует все символы кроме цифр
const number_validation = (e) => {
    let theEvent = e
    let key_number = theEvent.keyCode || theEvent.which
    let key_string = String.fromCharCode( key_number )
    let regex = /[0-9]/
    if( !regex.test(key_string) ) {
        if(theEvent.preventDefault) theEvent.preventDefault()
    }
}

export default number_validation;
