import jwt from "jsonwebtoken";

export default function(req,res,next){
    const token = req.header("Authorization");
    if(!token){
        res.status(401).json({message: "No token, authorization denied"})
    }
    
    try {
        const decoded = jwt.verify(token,process.env.JWR_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({message: "Token is not valid"});
    }
}