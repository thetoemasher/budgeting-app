update monthly_categories
set category_id = $1,
category_amount = $2
where monthly_category_id = $3;
