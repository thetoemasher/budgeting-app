select mc.monthly_category_id from monthly_categories mc
join categories c on mc.category_id = c.category_id
where c.category_name = 'Not Categorized'
and month_id = $1