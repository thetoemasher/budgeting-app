insert into monthly_categories(user_id, category_id, category_amount, category_total, category_diff, month_id)
values ($1, $2, $3, 0, $3, $4);
select * from monthly_categories mc
join categories c on mc.category_id = c.category_id
where mc.user_id = $1;