create table users(
    user_id serial primary key,
    email varchar(50),
    password varchar(128),
    first_name varchar(50),
    last_name varchar(50)
);

create table categories(
    category_id serial primary key,
    user_id integer references users(user_id),
    category_name varchar(128),
    deleted boolean default false
);

create table months (
    month_id serial primary key,
    user_id integer references users(user_id),
    month varchar(2),
    year varchar(4),
    month_amount numeric(7, 2),
    month_total numeric(7, 2),
    month_diff numeric(7, 2),
    month_name varchar(12)
);

create table monthly_categories(
    monthly_category_id serial primary key,
    user_id integer references users(user_id),
    category_id integer references categories(category_id),
    category_amount numeric(7, 2),
    category_total numeric(7, 2) default 0,
    category_diff numeric(7, 2),
    month_id integer references months(month_id)
);

create table payments(
    payment_id serial primary key,
    user_id integer references users(user_id),
    payment_type varchar(128),
    payment_amount numeric(7, 2),
    payment_date varchar(10),
    monthly_category_id integer references monthly_categories(monthly_category_id),
    payment_desc varchar(255),
    month_id integer references months(month_id)
);

