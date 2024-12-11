const require = ('express');
const app = express;
const jwt = require('jsonwebtoken');

//Authenticate with jwt tokens
app.post('/login', (req, res) => {
    
    const username = req.body.username
    const user = { name: username}

   const acessToken = jwt.sign(user, process.env.ACCESS_TOEKN_SECRET)
   res.json({ accessToekn: accessToken })

})