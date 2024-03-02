import { db} from '../connect.js'
import jwt  from 'jsonwebtoken';
import moment from 'moment';


export const getPost = (req,res)=>{
    // console.log(req.url);
    const userId = req.query.userId
    const token  = req.cookies.accessToken;
    // console.log(token);
    if(!token){
        return res.status(401).json("Not logged in");
    }

    jwt.verify(token,"secretkey", (err,userInfo)=>{
        if(err){
            return res.status(403).json("Token is not valid")
        }
        // console.log(userId);
        const q = userId !== "undefined" ?
                             `select distinct p.*, u.id as userId, name, profilePic from posts as p join users as u on (u.id = p.userId)
                              where p.userId = ? ORDER BY p.createdAt DESC`
                            :
                            `select distinct p.*, u.id as userId, name, profilePic from posts as p join users as u on (u.id = p.userId)
                            left join relationships as r ON (p.userId = r.followedUserId) where r.followerUserId = ? or p.userId = ?
                            ORDER BY p.createdAt DESC; `;
        

        const values = userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id]
        // console.log(values);
        db.query(q, values, (err,data)=>{
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            // console.log(res);
            res.status(200).json(data)
        });
    });
}



export const addPost = (req,res)=>{
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
        const q = "INSERT INTO posts (`desc`,`img`,`createdAt`,`userId`) values (?)";
        const values = [
            req.body.desc,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id
        ];
        // console.log(values)
        // console.log(req.body);

        db.query(q, [values], (err,data)=>{
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            // console.log(res);
            res.status(200).json("Post has been created")
        });
    });
   
}


export const deletePost = (req,res)=>{
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
        const q = "DELETE FROM posts Where `id` = ? and `userID` = ?";
        const values = [ req.params.id,  userInfo.id ]; // here id is postId
        // console.log(values)
        // console.log(req.body);

        db.query(q, values, (err,data)=>{
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            if(data.affectedRows > 0){
                return res.status(200).json("Post has been deleted");
            }
            
            res.status(403).json("You can delete only your post");
        });
    });
   
}