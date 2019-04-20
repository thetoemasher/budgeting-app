module.exports = {
    getPayments: async (req, res) => {
        try {
            const db = req.app.get('db')
            const user_id = req.query.user_id ? req.query.user_id : req.session.user.user_id 
            let {month_id} = req.params
            let payments = await db.payments.get_payments(month_id)
            res.status(200).send(payments)
        } catch(err) {
            console.log('Error in getPayments method in payments_controller', err)
            res.status(500).send(err)
        }
    },
    addPayment: async (req, res) => {
        try {
            const db = req.app.get('db')
            const user_id = req.query.user_id ? req.query.user_id : req.session.user.user_id 
            let {month_id} = req.params
            const {payment_type, payment_amount, payment_date, monthly_category_id, payment_desc} = req.body
            await db.payments.add_payment([user_id, payment_type, payment_amount, payment_date, monthly_category_id, payment_desc, month_id])
            await db.monthly_categories.update_monthly_category_totals(month_id)
            await db.months.update_month_totals(month_id)
            let payments = await db.payments.get_payments(month_id)
            res.status(200).send(payments)
        } catch(err) {
            console.log('Error in addPayment method in payments_controller', err)
            res.status(500).send(err)
        }
    },
    updatePayment: async (req, res) => {
        try {
            const db = req.app.get('db')
            const user_id = req.query.user_id ? req.query.user_id : req.session.user.user_id 
            let {month_id, payment_id} = req.params
            const {payment_type, payment_amount, payment_date, monthly_category_id, payment_desc} = req.body
            await db.payments.update_payment([payment_type, payment_amount, payment_date, monthly_category_id, payment_desc, payment_id])
            await db.monthly_categories.update_monthly_category_totals(month_id)
            await db.months.update_month_totals(month_id)
            let payments = await db.payments.get_payments(month_id)
            res.status(200).send(payments)
        } catch(err) {
            console.log('Error in updatePayment method in payments_controller', err)
            res.status(500).send(err)
        }
    },
    deletePayment: async (req, res) => {
        try {
            const db = req.app.get('db')
            const user_id = req.query.user_id ? req.query.user_id : req.session.user.user_id 
            let {month_id, payment_id} = req.params

            await db.payments.delete_payment([payment_id])
            await db.monthly_categories.update_monthly_category_totals(month_id)
            await db.months.update_month_totals(month_id)
            let payments = await db.payments.get_payments(month_id)
            res.status(200).send(payments)
        } catch(err) {
            console.log('Error in updatePayment method in payments_controller', err)
            res.status(500).send(err)
        }
    },
}