select * from monthly_categories mc
join categories c on mc.category_id = c.category_id
where mc.user_id = $1
and mc.month_id = $2