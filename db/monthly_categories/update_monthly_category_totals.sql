update monthly_categories
set category_total = (
    select coalesce(sum(payment_amount), 0) from payments
    where monthly_category_id = $1
)
where monthly_category_id = $1;
update monthly_categories
set category_diff = category_amount - category_total
where monthly_category_id = $1;