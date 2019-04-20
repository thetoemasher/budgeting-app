const _ = require('lodash')

async function formatMonths(db, user_id, month = null, year = null) {
    let months = []
    if(month && year) {
        months = await db.months.get_one_month([user_id, month, year])
        console.log(months)
    } else {
        months = await db.months.get_months(user_id)
    }
    let arrangedMonths = _.groupBy(months, m => m.year)
    return arrangedMonths
}

async function formatOneMonth(db, user_id, month, year) {
    let months = await db.months.get_one_month([user_id, month, year])
    let thisMonth = months[0]
    let categories = await db.monthly_categories.get_monthly_categories_by_month_id(user_id, thisMonth.month_id)
    let payments = await db.payments.get_payments(user_id, thisMonth.month_id)
    thisMonth.categories = categories
    thisMonth.payments = payments
    return thisMonth
}

module.exports = {
    formatMonths,
    formatOneMonth
}