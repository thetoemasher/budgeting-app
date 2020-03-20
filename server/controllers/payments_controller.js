module.exports = {
    getPayments: async (req, res) => {
        try {
            const db = req.app.get('db')
            const {month_id} = req.params
            const {user_id} = req.session.user
            const payments = await db.payments.get_payments(user_id, month_id)
            res.send(payments)
        } catch (err) {
            console.log('error', err)
            res.status(500).send(err)
        }
    },
    addPayment: async (req, res) => {
        try {
            const db = req.app.get('db')
            const {user_id} = req.session.user
            const {month_id} = req.params
            const {payment_type, payment_amount, payment_date, monthly_category_id, payment_desc} = req.body
            await db.payments.add_new_payment(user_id, month_id, payment_type, payment_amount, payment_date, monthly_category_id, payment_desc)
            const payments = await db.payments.get_payments(user_id, month_id)
            res.send(payments)
        } catch (err) {
            console.log('error', err)
            res.status(500).send(err)
        }
    },
    updatePayment: async (req, res) => {
        try {
            const db = req.app.get('db')
            const {user_id} = req.session.user
            const {month_id, payment_id} = req.params
            const {payment_type, payment_amount, payment_date, monthly_category_id, payment_desc} = req.body
            await db.payments.update_payment(user_id, payment_id, payment_type, payment_amount, payment_date, monthly_category_id, payment_desc)
            const payments = await db.payments.get_payments(user_id, month_id)
            res.send(payments)
        } catch (err) {
            console.log('error', err)
            res.status(500).send(err)
        }
    },
    deletePayment: async (req, res) => {
        try {
            const db = req.app.get('db')
            const {user_id} = req.session.user
            const {month_id, payment_id} = req.params
            await db.payments.delete_payment(user_id, payment_id)
            const payments = await db.payments.get_payments(user_id, month_id)
            res.send(payments)
        } catch (err) {
            console.log('error', err)
            res.status(500).send(err)
        }
    }
}