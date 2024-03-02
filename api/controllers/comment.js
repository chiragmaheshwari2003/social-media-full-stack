import { db} from '../connect.js';
import  jwt  from 'jsonwebtoken';
import moment from "moment";

export const getComments = (req,res)=>{
    // console.log(req.url);
   
    const q = `select distinct c.*, u.id as userId, name, profilePic from comments as c join users as u on (u.id =c.userId)
    where c.postId = ? ORDER BY c.createdAt DESC; `;

    db.query(q, [req.query.postId], (err,data)=>{
        if(err) {
            console.log(err);
            return res.status(500).json(err);
        }
        // console.log(res);
        res.status(200).json(data)
    });
}


export const addComment = (req,res)=>{
     // console.log(req.url);

     const token  = req.cookies.accessToken;
     // console.log(req.cookies);
     if(!token){
         return res.status(401).json("Not logged in");
     }
 
     jwt.verify(token,"secretkey", (err,userInfo)=>{
         if(err){
             return res.status(403).json("Token is not valid")
         }
         const q = "INSERT INTO comments(`desc`,`createdAt`,`userId`,`postId`) values (?)";
         const values = [
             req.body.desc,
             moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
             userInfo.id,
             req.body.postId
         ];
         // console.log(values)
         // console.log(req.body);
 
         db.query(q, [values], (err,data)=>{
             if(err) {
                 console.log(err);
                 return res.status(500).json(err);
             }
             // console.log(res);
             res.status(200).json("Comment has been created")
         });
     });
}