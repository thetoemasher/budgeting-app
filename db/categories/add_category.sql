insert into categories(user_id, category_name)
values ($1, $2)
returning *;