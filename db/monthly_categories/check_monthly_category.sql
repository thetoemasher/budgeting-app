select * from monthly_categories
where month_id = $1
and category_id = $2;