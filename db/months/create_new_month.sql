insert into months(user_id, month, year)
values($1, $2, $3)
returning *;