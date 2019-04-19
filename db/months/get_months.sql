select * from months
where user_id = $1
order by 
    year desc,
    month asc