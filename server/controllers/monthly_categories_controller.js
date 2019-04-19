module.exports = {
    getMonthlyCategories: async (req, res) => {
        const db = req.app.get('db')
        const {user} = req.session
        try {
            const monthlyCategories = await db.monthly_categories.get_monthly_categories(user.user_id)
            res.status(200).send({monthlyCategories})
        } catch(error) {
            console.log('Error getting monthly categories', error)
            res.status(500).send(error)
        }
    },
    addMonthlyCategory: async (req, res) => {
        const db = req.app.get('db')
        const {user} = req.session
        const {category} = req.body
        console.log(category)
        let monthlyCategories = []
        try {
            if(category.monthly_category_id === 'New') {
                const newCategory = await db.categories.add_category([user.user_id, category.new_category])
                const {category_id} = newCategory[0]
                monthlyCategories = await db.monthly_categories.add_monthly_category([user.user_id, category_id, category.category_amount, category.month_id])
            } else if (category.monthly_category_id) {
                monthlyCategories = await db.monthly_categories.add_monthly_category([user.user_id, category.monthly_category_id, category.category_amount, category.month_id])
            }
            await db.months.updateMonthTotal([category.month_id])
            let currentMonth = await formatOneMonth(db, user.user_id, month, year)
            const categories = await db.categories.get_categories([user.user_id])
            res.status(200).send({categories, currentMonth})
        } catch(error) {
            console.log('Error adding monthly categories', error)
            res.status(500).send(error)
        }
    }
}