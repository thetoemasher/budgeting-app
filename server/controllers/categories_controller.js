module.exports = {
    getUserCategories: async (req, res) => {
        try {
            const db = req.app.get('db')
            const {user_id} = req.session.user
            const categories = await db.categories.get_user_categories(user_id)
            res.send(categories)
        } catch (err) {
            console.log('error', err)
            res.status(500).send(err)
        }
    },
    addNewCategory: async (req, res) => {
        try {
            const db = req.app.get('db')
            const category_name = req.body.category_name.trim()
            const {user_id} = req.session.user
            const categoryMatch = await db.categories.check_category_name(user_id, category_name)
            if(categoryMatch.length === 0) {
                const category = await db.categories.add_new_category(user_id, category_name)
                const categories = await db.categories.get_user_categories(user_id)
                res.send({category: category[0], categories})
            } else {
                res.send(categoryMatch[0])
            }
        } catch (err) {
            console.log('error', err)
            res.status(500).send(err)
        }
        
    }
}