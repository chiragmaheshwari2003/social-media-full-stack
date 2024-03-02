import { db } from "../connect.js";
import jwt  from "jsonwebtoken";



export const getRelationships = (req,res)=>{
    
        const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";
        
        db.query(q, [req.query.followedUserId], (err, data)=>{
            if(err) {
                // console.log(err);
                return res.status(500).json(err);
            }
            // console.log(data); // it returns an object, we convert it to userIds;
            res.status(200).json(data.map(relationship => relationship.followerUserId));
        });
}

export const addRelationship = (req,res)=>{
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
        // console.log(req.body);
        const q = "INSERT INTO relationships(`followerUserId`,`followedUserId`) values (?)";
        const values = [
            userInfo.id,
            req.body.userId
        ];
        // console.log(values)
        // console.log(req.body);

        db.query(q, [values], (err,data)=>{
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            // console.log(res);
            res.status(200).json("Following")
        });
    });
}



export const deleteRelationship = (req,res)=>{
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
        const q = "DELETE FROM relationships WHERE  `followerUserId` = ? AND followedUserId = ?";
        // const values = [
        //     userInfo.id,
        //     req.body.postId
        // ];
        // console.log(values)
        // console.log(req.body);
        // console.log(req.query);
        db.query(q, [userInfo.id, req.query.userId], (err,data)=>{
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            // console.log(res);
            res.status(200).json("Unfollow")
        });
    });
}