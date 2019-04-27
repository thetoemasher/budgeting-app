module.exports = async (db, month_id, monthly_category_id) => {
    let notCatCheck = await db.monthly_categories.not_categorized_check(month_id)
    if(notCatCheck.length) {
        let notCat = notCatCheck[0]
        let payments = db.payments.get_payments_by_monthly_category_id(notCat.monthly_category_id)
        if(!payments.length) {
            // await db.monthly_categories.delete
        }
    }

    await db.monthly_categories.update_monthly_category_totals(month_id)
    await db.months.update_month_totals(month_id)
}