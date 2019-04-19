module.exports = {
    getCategories: async (req, res) => {
        const db = req.app.get('db')
        let {user} = req.session
        try{
            let categories = await db.categories.get_categories(user.user_id)
            res.status(200).send({categories})
        } catch(error){
            console.log('Error getting categories', error)
            res.status(500).send(error)
        }
    },
    // addCategory: async (req, res) => {
    //     const db = req.app.get('db')
    //     let {user} = req.session

    // }
}