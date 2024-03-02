import  express  from 'express';
import {db} from '../connect.js';
import bcrypt from "bcrypt"
import jwt  from 'jsonwebtoken';

export const register = (req,res)=>{

    //Check user. If exist 
    const q = "select * from users where username = ?"
    db.query(q,[req.body.username],(err,data)=>{
        if(err){
            return resizeBy.status(500).json(err)
        }
        if(data.length){
            return res.status(409).json("User already exists")
        }
        //Create a new user
        //Hash Password i.e. => 123 =>"adfdferfa"
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password,salt)
        
        const q = "insert into users (`username`,`email`,`password`,`name`) values (?)"
        const values = [req.body.username,req.body.email,hashedPassword,req.body.name];
        db.query(q,[values],(err,data)=>{
            if(err){
                return res.status(500).json(err);
            }
            return res.status(200).json("User has been created")

        })
    });
}


export const login = (req,res)=>{
    // console.log("Login function started");
    const q = "SELECT * from users where username = ?"
    
    db.query(q,[req.body.username],(err,data)=>{  
        if(err){
            return res.status(500).json(err)
        }
        if(data.length === 0){
            console.log("error");
            return res.status(404).json("User doesn't exist" )
        }

        const checkPassword = bcrypt.compareSync(req.body.password,data[0].password) // data is an array but since username is unique, it will haved max one element
        
        if(!checkPassword){
            res.status(400).json("Wrong username or password! ");
        }
        // why jwt => we don't nee user id again for this session   
        const token = jwt.sign({id : data[0].id},"secretkey");
        
        const {password, ...others} = data[0];
        // console.log(" login Successful till authentication");
        res.cookie("accessToken",token,{
            httpOnly : true // see cookies in postman afer making post request
        }).status(200).json(others) // not to send password.. but rest everything
    
    });
}

export const logout = (req,res)=>{
    res.clearCookie("accessToken",{
        secure: true,
        sameSite : "none"
    }).status(200).json("Logged out successfully");
}