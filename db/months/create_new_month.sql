insert into months(user_id, month, year, month_amount, month_total, month_diff)
values($1, $2, $3, 0.00, 0.00, 0.00)
returning *;