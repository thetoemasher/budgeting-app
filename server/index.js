require('dotenv').config()
const express=require('express')
	, massive=require('massive')
	, bodyPar=require('body-parser')
    , expressSession = require('express-session')
	, authCtrl = require('./controllers/auth_controller.js')
	, catCtrl = require('./controllers/categories_controller.js')
	, monthlyCatCtrl = require('./controllers/monthly_categories_controller.js')
	, monthsCtrl = require('./controllers/months_controller.js')
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


//USER MONTHLY CATEGORIES ENDPOINTS


//MONTHS ENDPOINTS


// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, '../build/index.html'))
// })

app.listen(SERVER_PORT, () => {
	console.log(`You spin port ${SERVER_PORT} right round, right round`)
})

