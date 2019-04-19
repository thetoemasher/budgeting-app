insert into categories(user_id, category_name) 
values($1, $2);
select category_id, category_name from categories
where user_id = $1
and deleted = false