update monthly_categories mc
set category_total = case when
                        (select sum(payment_amount) from payments p 
                        where p.monthly_category_id = mc.monthly_category_id) is not null 
                        then (select sum(payment_amount) from payments p 
                        where p.monthly_category_id = mc.monthly_category_id)
                        else 0.00
                        end,
    category_diff = case when
                        (select sum(payment_amount) from payments p 
                        where p.monthly_category_id = mc.monthly_category_id) is not null 
                        then mc.category_amount - (select sum(payment_amount) from payments p 
                        where p.monthly_category_id = mc.monthly_category_id)
                        else mc.category_amount
                        end
where mc.user_id = $1
and mc.month_id = $2;