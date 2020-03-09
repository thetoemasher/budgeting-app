select * from monthly_categories
where user_id = $1
and month_id = $2
and category_id = $3;