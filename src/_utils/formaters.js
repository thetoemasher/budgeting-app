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

module.exports = {
    amountFormater
}