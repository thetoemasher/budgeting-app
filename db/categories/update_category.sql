update categories
set category_name = $2
where category_id = $1;
select category_id, category_name from categories
where user_id = $3
and deleted = false;