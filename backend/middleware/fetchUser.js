const jwt = require('jsonwebtoken');

const fetchUser = async (req, res, next)=>{
    const token = req.header('auth-token');
    console.log(token);
    if(!token) return res.status(401).send({errors:"Token is not valid!"});
    try {
        const data = jwt.verify(token, process.env.SECREET_USER);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({errors:" token tidak valid"})
    }
}

module.exports = fetchUser;