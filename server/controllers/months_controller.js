const {formatMonths, formatOneMonth} = require('../../_utils/formatMonths')
module.exports = {
    getMonth: async (req, res) => {
        const db = req.app.get('db')
        // let {user} = req.session
        let user = {
            user_id: 19
        }
        const {month, year} = req.params
        try{
            let months = await formatOneMonth(db, user.user_id, month, year)
            res.status(200).send({currentMonth: months})
        } catch(error){
            console.log('Error getting categories', error)
            res.status(500).send(error)
        }
    },
}