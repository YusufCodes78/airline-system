import jwt from "jsonwebtoken";
import User from 'shared/src/models/User';
const auth = async (req: any, res: any, next: any) => {
    try{
        const token = req.header("Authorization").replace("Bearer ", "");
        const decrypt:jwt.JwtPayload|string = jwt.verify(token, process.env.JWT_SECRET || "");
        const user = await User.findOne({_id: (decrypt as jwt.JwtPayload)._id, "tokens.token": token});
    
        if(!user){
            throw new Error()
        }
    
        req.user = user;
        req.token = token;
        next();
    }
    catch(e){
        res.status(401).send({error: "Please authenticate"});
    }
    
}
export default auth;