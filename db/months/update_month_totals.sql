update months
set month_amount = (
    select coalesce(sum(category_amount), 0) from monthly_categories
    where month_id = $1
),
month_total = (
    select coalesce(sum(category_total), 0) from monthly_categories
    where month_id = $1
)
where month_id = $1;
update months
set month_diff = month_amount - month_total
where month_id = $1;