require('dotenv').config()
const express=require('express')
	, massive=require('massive')
	, bodyPar=require('body-parser')
    , expressSession = require('express-session')
	, authCtrl = require('./controllers/auth_controller.js')
	, categoriesCtrl = require('./controllers/categories_controller.js')
	, monthlyCategoriesCtrl = require('./controllers/monthly_categories_controller.js')
	, monthsCtrl = require('./controllers/months_controller.js')
	, paymentsCtrl = require('./controllers/payments_controller.js')
    , path = require('path')
    
const app=express()
const {
    CONNECTION_STRING, 
    SESSION_SECRET, 
    SERVER_PORT
} = process.env

const session = expressSession({
		  secret: SESSION_SECRET,
		  resave: false,
		  saveUninitialized: true
});
	  
massive(CONNECTION_STRING).then(db=>{
	app.set('db', db)
	console.log('db connect success!')
})

app.use(bodyPar.json())
app.use(session)
app.use( express.static( `${__dirname}/../build` ) );
app.use(expressSession(session))


//AUTH ENDPOINTS
app.post('/auth/login', authCtrl.login)
app.post('/auth/register', authCtrl.register)
app.get('/auth/user', authCtrl.currentUser)
app.get('/auth/logout', authCtrl.logout)

//USER CATEGORIES ENDPOINTS
app.get('/api/categories', categoriesCtrl.getCategories)
app.post('/api/categories', categoriesCtrl.addCategory)
app.delete('/api/categories/:category_id', categoriesCtrl.deleteCategory)
app.put('/api/categories/:category_id', categoriesCtrl.updateCategory)

//USER MONTHLY CATEGORIES ENDPOINTS
app.post('/api/months/:month_id/categories', monthlyCategoriesCtrl.addMonthlyCategory)
app.get('/api/months/:month_id/categories', monthlyCategoriesCtrl.getMonthlyCategories)
app.put('/api/months/:month_id/categories/:monthly_category_id', monthlyCategoriesCtrl.updateMonthlyCategory)

//USER PAYMENT ENDPOINTS
app.get('/api/months/:month_id/payments', paymentsCtrl.getPayments)
app.post('/api/months/:month_id/payments', paymentsCtrl.addPayment)
app.put('/api/months/:month_id/payments/:payment_id', paymentsCtrl.updatePayment)
app.delete('/api/months/:month_id/payments/:payment_id', paymentsCtrl.deletePayment)

//MONTHS ENDPOINTS
app.get('/api/months', monthsCtrl.getMonths)
app.get('/api/months/:month/:year', monthsCtrl.getMonthByMonthAndYear)
app.get('/api/months/:month_id', monthsCtrl.getMonthById)


// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, '../build/index.html'))
// })

app.listen(SERVER_PORT, () => {
	console.log(`You spin port ${SERVER_PORT} right round, right round`)
})

