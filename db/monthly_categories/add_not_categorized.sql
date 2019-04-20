insert into monthly_categories(user_id,category_id,category_amount,category_total,category_diff,month_id)
values($1, (
    select category_id 
    from categories 
    where category_name = 'Not Categorized' 
    and user_id = $1
    ), 0, 0, 0, $2)
returning *;