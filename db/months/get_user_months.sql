select * from months
where user_id = $1
order by month_id desc;