module.exports = {
    getMonthCategories: async (req, res) => {
        try {
            const db = req.app.get('db')
            const {user_id} = req.session.user
            const {month_id} = req.params
            const monthlyCategories = await db.monthCats.get_user_monthly_categories(user_id, month_id)
            res.send(monthlyCategories)
        
        } catch (err) {
            console.log('error', err)
            res.status(500).send(err)
        }  
    },
    addMonthCategory: async (req, res) => {
        try {
            const db = req.app.get('db')
            const {user_id} = req.session.user
            const {category_id, category_amount} = req.body
            const {month_id} = req.params
            await db.monthCats.add_monthly_category(user_id, category_id, category_amount, month_id) 
            const monthlyCategories = await db.monthCats.get_user_monthly_categories(user_id, month_id)
            res.send(monthlyCategories)
        } catch (err) {
            console.log('error2', err)
            res.status(500).send(err)
        }
    },
    update: async (req, res) => {
        const db = req.app.get('db')
        
    },
    delete: async (req, res) => {
        const db = req.app.get('db')
        
    },
    recalculateMonthCats: async (req, res) => {
        try {
            const db = req.app.get('db')
            const {user_id} = req.session.user
            const {month_id} = req.params
            await db.monthCats.update_monthly_categories_values(user_id, month_id)
            const monthlyCategories = await db.monthCats.get_user_monthly_categories(user_id, month_id)
            
            res.send(monthlyCategories)
        } catch (err) {
            console.log('error', err)
            res.status(500).send(err)
        }
    }
}