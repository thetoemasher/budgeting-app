update months
set month_amount = (select sum(category_amount) from monthly_categories where month_id = $1),
month_diff = ((select sum(category_amount) from monthly_categories where month_id = $1) - (select sum(category_total) from monthly_categories where month_id = $1));
select * from months
where month_id = $1