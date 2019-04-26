module.exports = {
    addMonthlyCategory: async (req, res) => {
        try {
            const db = req.app.get('db')
            const user_id = req.query.user_id ? req.query.user_id : req.session.user.user_id 
            let {category_id, new_category_name, category_amount} = req.body
            let {month_id} = req.params

            if(category_id === 'New') {
                //create new category
                let newCat = await db.categories.add_category([user_id, new_category_name])
                category_id = newCat[0].category_id
            } else {
                let monthly_category_check = await db.monthly_categories.check_monthly_category([month_id, category_id])
                if(monthly_category_check.length) {
                    return res.status(400).send({error: 'Category already added to this month'})
                }
            }
            await db.monthly_categories.add_monthly_category([user_id, category_id, category_amount, month_id])
            await db.months.update_month_totals(month_id)
            let monthly_categories = await db.monthly_categories.get_monthly_categories_by_month_id(month_id)
            res.status(200).send(monthly_categories)
        } catch(err) {
            console.log('Error in addMonthlyCategory method in monthly_categories_controller', err)
            res.status(500).send(err)
        }
    },
    getMonthlyCategories: async (req, res) => {
        try {
            const db = req.app.get('db')
            const user_id = req.query.user_id ? req.query.user_id : req.session.user.user_id 
            let {month_id} = req.params
            let monthly_categories = await db.monthly_categories.get_monthly_categories_by_month_id(month_id)
            res.status(200).send(monthly_categories)
        } catch(err) {
            console.log('Error in getMonthlyCategories method in monthly_categories_controller', err)
            res.status(500).send(err)
        }
    },
    updateMonthlyCategory: async (req, res) => {
        try {
            const db = req.app.get('db')
            const user_id = req.query.user_id ? req.query.user_id : req.session.user.user_id 
            let {month_id, monthly_category_id} = req.params
            let {category_id, category_amount, new_category_name} = req.body
            if(category_id === 'New') {
                //create new category
                let newCat = await db.categories.add_category([user_id, new_category_name])
                category_id = newCat[0].category_id
            } else {
                let monthly_category_check = await db.monthly_categories.check_monthly_category([month_id, category_id])
                if(monthly_category_check.length) {
                    return res.status(400).send({error: 'Category already added to this month'})
                }
            }
            await db.monthly_categories.update_monthly_category([category_id, category_amount, monthly_category_id])
            await db.months.update_month_totals(month_id)
            let monthly_categories = await db.monthly_categories.get_monthly_categories_by_month_id(month_id)
            await db.monthly_categories.update_monthly_category_totals(month_id)
            await db.months.update_month_totals(month_id)
            res.status(200).send(monthly_categories)
        } catch(err) {
            console.log('Error in updateMonthlyCategory method in monthly_categories_controller', err)
            res.status(500).send(err)
        }
    },
    deleteMonthlyCategory: async (req, res) => {
        try {
            const db = req.app.get('db')
            const user_id = req.query.user_id ? req.query.user_id : req.session.user.user_id 
            let {month_id, monthly_category_id} = req.params

            let payments = await db.payments.get_payments_by_monthly_category_id(monthly_category_id)
            if(payments.length) {
                let not_categorized_id
                let notCategorizedCheck = await db.monthly_categories.not_categorized_check([month_id])
                if(!notCategorizedCheck.length) {
                    let notCategorized = await db.monthly_categories.add_not_categorized([user_id, month_id])
                    not_categorized_id = notCategorized[0].monthly_category_id
                } else {
                    not_categorized_id = notCategorizedCheck[0].monthly_category_id
                }
                await db.monthly_categories.delete_monthly_category([monthly_category_id, not_categorized_id, month_id, user_id])
            } else {
                await db.monthly_categories.delete_one_monthly_category(monthly_category_id)
            }

            await db.monthly_categories.update_monthly_category_totals(month_id)
            await db.months.update_month_totals(month_id)
            res.sendStatus(200)
        } catch(err) {
            console.log('Error in deleteMonthlyCategory method in monthly_categories_controller', err)
            res.status(500).send(err)
        }
    },
}