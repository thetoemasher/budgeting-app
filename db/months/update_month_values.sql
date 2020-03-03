update months
set month_amount = (select sum(category_amount) from monthly_categories mc where months.month_id = mc.month_id),
month_diff = (select sum(category_diff) from monthly_categories mc where months.month_id = mc.month_id),
month_total = (select sum(category_total) from monthly_categories mc where months.month_id = mc.month_id)
where months.user_id = $1;

select * from months
where user_id = $1
order by month_id desc;