select mc.*, c.category_name from monthly_categories mc
join categories c on c.category_id = mc.category_id
where month_id = $1
order by id;