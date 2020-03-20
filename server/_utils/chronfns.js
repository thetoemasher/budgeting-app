async function newMonth(db, user_id, month = 0, year = 0, category_id  = 0) {
    try {
        if(month === 0 || year === 0) {
            const date = new Date();
            month = date.getMonth() + 1
            year = date.getFullYear()
        }
        //check if No Category category exists, create if doesn't
        if(category_id === 0) {
            const noCatCheck = await db.categories.get_user_no_category([user_id]);
            if(noCatCheck.length > 0) {
                category_id = noCatCheck[0].category_id
            } else {
                const noCat = await db.categories.create_no_category([user_id])
                category_id = noCat[0].category_id
            }
        }
        let month_id = 0;
        //check if Current Month already exists, create if doesn't
        const currentMonth = await db.months.get_current_month([user_id, month, year]);
        if(currentMonth.length > 0) {
            month_id = currentMonth[0].month_id
        } else {
            const newMonth = await db.months.create_new_month([user_id, month, year])
            month_id = newMonth[0].month_id
        }
        //check if No Category monthly category exists, create if doesn't
        const noCatMonthCheck = await db.monthCats.get_not_cat([user_id, month_id, category_id])
        if(noCatMonthCheck.length === 0 ) {
            const newMonthCat = await db.monthCats.add_monthly_category([user_id, category_id, 0, month_id])
        }

    } catch (err) {
        console.log('error', err)
        throw(err)
    }
}

async function newMonthChron(db) {
    try {
        const users = await db.auth.get_users()
        const date = new Date();
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        users.forEach(async u => {
            await newMonth(db, u.user_id, month, year)
        })
        return 'success'

    } catch (err) {
        console.log('error', err)
        return 'fail'
    }
}

module.exports = {
    newMonth,
    newMonthChron
}