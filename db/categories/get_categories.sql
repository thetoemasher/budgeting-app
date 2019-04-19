select category_id, category_name from categories
where user_id = $1
and deleted = false