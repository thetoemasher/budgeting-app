update monthly_categories mc
set category_total = (
    select coalesce(sum(payment_amount), 0) from payments P
    where mc.monthly_category_id = p.monthly_category_id
)
where month_id = $1;
update monthly_categories
set category_diff = category_amount - category_total