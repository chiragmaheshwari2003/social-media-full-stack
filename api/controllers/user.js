import { db } from "../connect.js";
import jwt from "jsonwebtoken";


export const getUser = (req,res) =>{
    
    const userId = req.params.userId;
    // console.log(req.params.userId);
    const q = "SELECT * FROM users WHERE id=?";

    db.query(q, [userId],(err, data)=>{
        if(err){
            return res.status(500).json(err);
        }
        // console.log(data);
        const { password, ...info } = data[0];
        return res.status(200).json(info);
    });
}


export const updateUser = (req,res) =>{
    
   const token = req.cookies.accessToken;
   
   if(!token) {
    return res.setStatus(401).json("Not Authenticated!");
   }

   jwt.verify(token,"secretkey", (err, userInfo)=>{
    if(err){
        res.status(403).json('Token is not valid!');
    }
    // console.log(userInfo);
    const q = "UPDATE users SET `name` = ?, `city` = ?, `website` = ?, `profilePic` = ?, `coverPic` = ? where id = ?";
    console.log(req.body);
    const values = [req.body.name, req.body.city,req.body.website, req.body.profilePic, req.body.coverPic, userInfo.id]
    db.query(q, values, (err,data)=>{
        if(err){
            res.status(500).json(err);
        }
        // console.log(data);
        if(data.affectedRows > 0){
            return res.status(200).json("Updated");
        }
        return res.status(403).json("you can update only your profile")
    });
   });
}
