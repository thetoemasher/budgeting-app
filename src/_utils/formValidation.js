
function emailCheck(email) {
    //regex came from http://emailregex.com/
    let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return regex.test(email)
}

function passwordCheck(password) {
    // (?=.*[!@#\$%\^&\*]) add in for special characters
    let regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)
    return regex.test(password)
}

module.exports = {
    emailCheck,
    passwordCheck,
}