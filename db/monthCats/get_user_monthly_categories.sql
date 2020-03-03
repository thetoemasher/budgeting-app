select * from monthly_categories as mc
join categories as c on mc.category_id = c.category_id
where mc.user_id = $1
and mc.month_id = $2
order by mc.monthly_category_id asc