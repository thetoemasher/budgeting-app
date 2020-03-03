const bcrypt = require('bcrypt')
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

			return res.status(200).send({user: req.session.user})

		} catch (error) {
			console.log('error registering user: ', error)
			res.status(500).send({error})
		}
	},
	currentUser: async (req, res) => {
		res.status(200).send({user: req.session.user})
	},
	logout: (req, res) => {
		req.session.destroy()
		res.sendStatus(200)
	},
	forgotPassword: async (req, res) => {
		//for forgotten passwords
		//create token and email link to user
		//link will contain token
		//create front end that goes to that link for resetting password
	},
	changePassword: async (req, res) => {
		//takes in user, password, and forgot password token
		//checks for user with token
		//if finds then hash password and update users password and remove the token
	}
}