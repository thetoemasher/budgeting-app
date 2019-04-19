update categories
set deleted = true
where category_id = $1;
select category_id, category_name from categories
where user_id = $2
and deleted = false