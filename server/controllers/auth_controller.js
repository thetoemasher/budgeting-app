const bcrypt = require('bcrypt')
const _ = require('lodash')

module.exports = {
    login:	async (req, res)=>{
		try {
			let db = req.app.get('db')
			let { email, password } = req.body;
            let user = await db.auth.get_user([email])
            
            if(!user[0]) {
				return res.status(200).send({error: 'User not found. Please try again or create an account.'})
			}
			let authentication = bcrypt.compareSync(password, user[0].password);
			if (!authentication) {
				return res.status(200).send({error: 'Email and password do not match'})
			}
			delete user[0].password
			req.session.user = user[0]
			return res.status(200).send({user: req.session.user})
		} catch (error) {
			console.log('error logging in user: ', error)
			res.status(500).send({error})
		}
    },
    register: async (req, res)=> {
		try {
			let db = req.app.get('db')
			let { email, first_name, last_name, password} = req.body;
			
			let existing = await db.auth.get_user([email])
			if (existing[0]) {
				return res.status(200).send({error: 'Email already has an account'})
			}

			let salt = bcrypt.genSaltSync(10)
			let hash = bcrypt.hashSync(password, salt);

			let newUser = await db.auth.create_user([email, first_name, last_name, hash]);
			req.session.user = newUser[0]
			let date = new Date()
			let month = date.getMonth()
			let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
			let monthName = monthNames[month]
			if(month < 10) month = '0' + (month + 1)
			let year = date.getFullYear()
			await db.months.add_month([newUser[0].user_id, month, monthName, year])
			await db.categories.add_not_categorized(newUser[0].user_id)
			return res.status(200).send({user: req.session.user})

		} catch (error) {
			console.log('error registering user: ', error)
			res.status(500).send({error})
		}
	},
	currentUser: async (req, res) => {
		const db = req.app.get('db')
		if(req.session.user) {
			res.status(200).send({user: req.session.user})
		} else {
			res.status(200)
		}
	},
	logout: (req, res) => {
		req.session.destroy()
		res.sendStatus(200)
	}
}