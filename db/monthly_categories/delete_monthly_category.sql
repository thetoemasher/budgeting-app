update payments
set monthly_category_id = $2
where monthly_category_id = $1;

update monthly_categories
set category_amount = category_amount + (
    select category_amount 
    from monthly_categories 
    where monthly_category_id = $1
)
where monthly_category_id = $2;

delete from monthly_categories
where monthly_category_id = $1;