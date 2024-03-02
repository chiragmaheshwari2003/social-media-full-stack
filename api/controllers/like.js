import { db } from "../connect.js";
import jwt  from "jsonwebtoken";



export const getLikes = (req,res)=>{
      // console.log(req.url);

    
        const q = "SELECT userId FROM likes WHERE postId = ?";
        
        // console.log(values)
        // console.log(req.body);

        db.query(q, [req.query.postId], (err, data)=>{
            if(err) {
                // console.log(err);
                return res.status(500).json(err);
            }
            // console.log(res);
            res.status(200).json(data.map(like=>like.userId));
        });
}

export const addLike = (req,res)=>{
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
        const q = "INSERT INTO likes(`userId`,`postId`) values (?)";
        const values = [
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
            res.status(200).json("Post has been Liked")
        });
    });
}



export const deleteLike = (req,res)=>{
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
        const q = "DELETE FROM likes WHERE  `userId` = ? AND postId = ?";
        // const values = [
        //     userInfo.id,
        //     req.body.postId
        // ];
        // console.log(values)
        // console.log(req.body);

        db.query(q, [userInfo.id, req.query.postId], (err,data)=>{
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            // console.log(res);
            res.status(200).json("post  has been Disliked")
        });
    });
}