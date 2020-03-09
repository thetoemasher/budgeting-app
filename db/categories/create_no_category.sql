insert into categories(user_id, category_name)
values($1, 'No Category')
returning *;