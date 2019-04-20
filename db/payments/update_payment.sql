update payments
set payment_type = $1,
payment_amount = $2, 
payment_date = $3, 
monthly_category_id = $4, 
payment_desc = $5
where payment_id = $6