import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../services/user.services.js";

export const signup = async(req,res) =>{
    const {username,email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(user) return res.status(400).json({message: "User already exist"});

        const hashedPassword = await bcrypt.hash(password,10);

        user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        res.status(201).json({message: "User registered successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const signin = async(req,res) =>{
    const {password,email} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "Invalid credential"});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).josn({message: 'Invalid credentials'});

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        res.json({accessToken,refreshToken})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
    
export const refreshEndPoint = async(req,res) =>{
    const {refreshToken} = req.body;

    if(!refreshToken) return res.status(401).json({message: "Refresh token required"});

    try {
        const decoded = jwt.verify(
            refreshToken,process.env.JWT_REFRESH_SECRET
        );

        const user = await user.findById(decoded.id);

        if(!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({message: "Invalid refresh token"});
        }

        const accessToken = generateAccessToken(user);

        res.json({accessToken});
    } catch (error) {
        res.status(403).json({message: "Token expired"})
    }
}