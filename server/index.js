require('dotenv').config()
const express=require('express') 
const massive=require('massive')
const bodyPar=require('body-parser')
const CronJob = require('cron').CronJob
const expressSession = require('express-session')
const authCtrl = require('./controllers/auth_controller.js')
const catCtrl = require('./controllers/categories_controller.js')
const monthCtrl = require('./controllers/months_controller.js')
const monthCatCtrl = require('./controllers/month_categories_controller.js')
const paymentCtrl = require('./controllers/payments_controller.js')
const path = require('path')
const app=express()
const {newMonth, newMonthChron} = require('./_utils/chronfns')


const { CONNECTION_STRING, 
    	SESSION_SECRET, 
		SERVER_PORT 
} = process.env

const session = expressSession({
		  secret: SESSION_SECRET,
		  resave: false,
		  saveUninitialized: true
});
massive(CONNECTION_STRING).then(db=>{
	try {
		app.set('db', db)
		console.log('db connect success!')
	} catch (err) {
		console.log('error', err)
	}
})

const job = new CronJob('0 0 0 1 * *', function() {
	newMonthChron()
})
job.start()

app.use(bodyPar.json())
app.use(session)
app.use( express.static( `${__dirname}/../build` ) );
app.use(session)


//AUTH ENDPOINTS
app.post('/auth/login', authCtrl.login)
app.post('/auth/register', authCtrl.register)
app.get('/auth/user', authCtrl.currentUser)
app.get('/auth/logout', authCtrl.logout)

//CATEGORY ENDPOINTS
app.get('/api/categories', catCtrl.getUserCategories)
app.post('/api/categories/add', catCtrl.addNewCategory)

//MONTH ENDPOINTS
app.get('/api/months', monthCtrl.getUserMonths)
app.get('/api/months/current', monthCtrl.getCurrentMonth)
app.get('/api/months/recalculate', monthCtrl.recalculateMonths)
app.get('/api/months/:month_id', monthCtrl.getMonthById)

//MONTH CATEGORY ENDPOINTS
app.get('/api/month/:month_id/categories', monthCatCtrl.getMonthCategories)
app.post('/api/month/:month_id/categories/add', monthCatCtrl.addMonthCategory)


//PAYMENT ENDPOINTS
app.get('/api/month/:month_id/payments', paymentCtrl.getPayments)
app.post('/api/month/:month_id/payments', paymentCtrl.addPayment)
app.put('/api/month/:month_id/payments/:payment_id', paymentCtrl.updatePayment)
app.delete('/api/month/:month_id/payments/:payment_id', paymentCtrl.deletePayment)


// app.get('/api/testing', async (req, res) => {
// 	try {
// 		const db = req.app.get('db')
// 		await newMonthChron(db)
// 		res.send('done')
// 	} catch (err) {
// 		console.log('error', err)
// 		res.status(500).send(err)
// 	}
// })
// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, '../build/index.html'))
// })

app.listen(SERVER_PORT, () => {
	console.log(`You spin port ${SERVER_PORT} right round, right round`)
})

