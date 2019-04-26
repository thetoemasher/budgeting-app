const _ = require('lodash')

module.exports = {
    getMonths: async (req, res) => {
        try {
            const db = req.app.get('db')
            const user_id = req.query.user_id ? req.query.user_id : req.session.user.user_id 
            let months = await db.months.get_months(user_id)
            let arrangedMonths = _.groupBy(months, m => m.year)
            res.status(200).send(arrangedMonths)
        } catch(err) {
            console.log('Error in getMonths method in months_controller', err)
            res.status(500).send(err)
        }
    },
    getMonthById: async (req, res) => {
        try {
            const db = req.app.get('db')
            let {month_id} = req.params
            let monthObj = await db.months.get_month_by_id(month_id)
            let monthly_categories = await db.monthly_categories.get_monthly_categories_by_month_id(month_id)
            let payments = await db.payments.get_payments(month_id)
            monthObj = {...monthObj[0], monthly_categories, payments}
            res.status(200).send(monthObj)
        } catch(err) {
            console.log('Error in getMonthById method in months_controller', err)
            res.status(500).send(err)
        }
    },
    getMonthByMonthAndYear: async (req, res) => {
        try {
            const db = req.app.get('db')
            const user_id = req.query.user_id ? req.query.user_id : req.session.user.user_id 
            const {month, year} = req.params
            let monthObj = await db.months.get_month_by_month_and_year([month, year, user_id])
            if(monthObj.length) {
                const month_id = monthObj[0].month_id
                let monthly_categories = await db.monthly_categories.get_monthly_categories_by_month_id(month_id)
                let notCatIndex = monthly_categories.findIndex(mc => mc.category_name === 'Not Categorized')
                if(notCatIndex !== -1) {
                    monthly_categories.push(...monthly_categories.splice(notCatIndex, 1))
                }
                let payments = await db.payments.get_payments(month_id)
                monthObj = {...monthObj[0], monthly_categories, payments}
                res.status(200).send(monthObj)
            } else {
                res.status(400).send({error: 'Month could not be found'})
            }
        } catch(err) {
            console.log('Error in getMonthByMonthAndYear method in months_controller', err)
            res.status(500).send(err)
        }
    }
}