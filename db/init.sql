create table users(
    user_id serial primary key,
    email varchar(50),
    password varchar(128),
    first_name varchar(50),
    last_name varchar(50)
)

create table categories(
    category_id serial primary key,
    user_id integer references users(user_id),
    category_name varchar(128),
    category_amount numeric(7, 2),
    category_total numeric(7, 2),
    category_diff numeric(7, 2)
)

create table payments(
    payment_id serial primary key,
    user_id integer references users(user_id),
    payment_type varchar(128),
    payment_amount numeric(7, 2),
    payment_date date,
    category_id integer references categories(category_id),
    payment_desc varchar(255)
)