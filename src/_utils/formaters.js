function amountFormater(amount) {
    let rounded = Math.round(+amount * 100) / 100
    let toString = '' + rounded
    let split = toString.split('.')
    if(!split[1]) {
        split.push('00')
    } else if(split[1].length === 1) {
        split[1] += '0'
    } 
    return split.join('.')
}
function getMonthName(monthNum) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return months[monthNum - 1]
}
module.exports = {
    amountFormater,
    getMonthName
}