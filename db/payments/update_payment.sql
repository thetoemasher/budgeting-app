update payments
set payment_type = $3, 
payment_amount = $4, 
payment_date = $5, 
monthly_category_id = $6, 
payment_desc = $7
where user_id = $1
and payment_id = $2;