insert into users(email, first_name, last_name, password)
values ( $1, $2, $3, $4)
returning user_id, email, first_name, last_name;