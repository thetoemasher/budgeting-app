select * from payments
where user_id = $1
and month_id = $2
order by payment_date, payment_id;