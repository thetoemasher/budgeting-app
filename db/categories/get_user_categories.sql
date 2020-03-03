select * from categories
where user_id = $1
order by category_name asc;