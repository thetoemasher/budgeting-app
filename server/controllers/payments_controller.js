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
    }
}