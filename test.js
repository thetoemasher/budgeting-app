const bcrypt = require('bcrypt');

let password = 'Concert06'

let salt = bcrypt.genSaltSync(10)
let hash = bcrypt.hashSync(password, salt);
console.log(hash)