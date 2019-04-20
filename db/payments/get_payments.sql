select p.*, c.category_name from payments p
join monthly_categories mc on mc.monthly_category_id = p.monthly_category_id
join categories c on c.category_id = mc.category_id
where p.month_id = $1
order by p.payment_id;