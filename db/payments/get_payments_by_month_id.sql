select p.*, c.category_name from payments p
join monthly_categories mc on p.monthly_category_id = mc.monthly_category_id
join categories c on mc.category_id = c.category_id
where p.user_id = $1
and mc.month_id = $2