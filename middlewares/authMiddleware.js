const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=> {
    const token = req.cookies.token;

    if(!token) return next();
    console.log(token);
    

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        throw new Error("user is already logged in");
    } catch (err) {
        return res.status(401).json({message: err.message});
    }
}