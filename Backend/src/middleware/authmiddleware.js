import jwt from 'jsonwebtoken'

export default function auth(req,res,next){
    const token =req.cookies.token;
if(!token) return res.status(401).json({message:"Unauthorized"})

    jwt.verify(token,preocess)
}
