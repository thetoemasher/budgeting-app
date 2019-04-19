module.exports = {
    getCategories: async (req, res) => {
        try {
            const db = req.app.get('db')
            const user_id = req.query.user_id ? req.query.user_id : req.session.user.user_id 
            let categories = await db.categories.get_categories(user_id)
            res.status(200).send(categories)
        } catch(err) {
            console.log('Error in getCategories method in categories_controller', err)
            res.status(500).send(err)
        }
    },
    addCategory: async (req, res) => {
        try {
            const db = req.app.get('db')
            const user_id = req.query.user_id ? req.query.user_id : req.session.user.user_id 
            const {category_name} = req.body
            let categories = await db.categories.add_category([user_id, category_name])
            res.status(200).send(categories)
        } catch(err) {
            console.log('Error in addCategory method in categories_controller', err)
            res.status(500).send(err)
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const db = req.app.get('db')
            const user_id = req.query.user_id ? req.query.user_id : req.session.user.user_id 
            const {category_id} = req.params
            let categories = await db.categories.delete_category([category_id, user_id])
            res.status(200).send(categories)
        } catch(err) {
            console.log('Error in deleteCategory method in categories_controller', err)
            res.status(500).send(err)
        }
    },
    updateCategory: async (req, res) => {
        try {
            const db = req.app.get('db')
            const user_id = req.query.user_id ? req.query.user_id : req.session.user.user_id 
            const {category_id} = req.params
            const {category_name} = req.body
            let categories = await db.categories.update_category([category_id, category_name, user_id])
            res.status(200).send(categories)
        } catch(err) {
            console.log('Error in updateCategory method in categories_controller', err)
            res.status(500).send(err)
        }
    }
}