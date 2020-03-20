module.exports = {
    getUserMonths: async (req, res) => {
        try {
            const db = req.app.get('db')
            const {user_id} = req.session.user
            // const user_id = 19;
            const months = await db.months.get_user_months(user_id);
            const orderedMonths = {}
            months.forEach(m => {
                const year = parseInt(m.year)
                if(orderedMonths[year]) {
                    orderedMonths[year].push(m)
                } else {
                    orderedMonths[year] = [m]
                }
            });
            res.send(orderedMonths)
        } catch(error) {
            console.log('error logging in user: ', error)
			res.status(500).send({error})
        }       
    },
    getMonthById: async (req, res) => {
        try {
            const db = req.app.get('db')
            const {month_id} = req.params
            const month = await db.months.get_month_by_id(month_id)
            res.send(month)
        } catch (err) {
            console.log('error', err)
            res.status(500).send(err)
        }
    },
    getCurrentMonth: async (req, res) => {
        try {
            const db = req.app.get('db')

            const date = new Date()
            let currentMonth = date.getMonth() + 1
            let currentYear = date.getFullYear()
            const {user_id} = req.session.user

            const month = await db.months.get_current_month(user_id, currentMonth, currentYear)
            if(month.length > 0) {
                res.send(month[0])
            } else {
                const newMonth = await db.months.create_new_month(user_id, currentMonth, currentYear)
                res.send(newMonth);
            }
        } catch (err) {
            console.log('error', err)
            res.status(500).send(err)
        }
    },
    recalculateMonths: async (req, res) => {
        try {
            const db = req.app.get('db')
            const {user_id} = req.session.user
            const months = await db.months.update_month_values(user_id)
            const orderedMonths = {}
            months.forEach(m => {
                if(orderedMonths[m.year]) {
                    orderedMonths[m.year].push(m)
                } else {
                    orderedMonths[m.year] = [m]
                }
            });
            res.send(orderedMonths)
            //update_month_values
        } catch (err) {
            console.log('error', err)
            res.status(500).send(err)
        }
    }
}