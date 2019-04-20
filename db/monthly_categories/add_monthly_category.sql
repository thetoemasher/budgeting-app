insert into monthly_categories(user_id, category_id, category_amount, category_total, category_diff, month_id)
values($1, $2, $3, 0, $3, $4);