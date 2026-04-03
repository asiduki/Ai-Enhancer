const bcrypt = require('bcrypt')
const User = require('../Models/user')
const jwt = require('jsonwebtoken')


const Register_user = async (req , res) =>{
    try{
        const {name , email , password} = req.body;
        
        const find_existing_user = await User.findOne({email});
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if(find_existing_user){
            return res.status(409).json({message:'User already exist'})
        }

        bcrypt.hash(password , 10 , async(err,hash)=>{
            let CreateUser = await User.create({
                name,
                email,
                password:hash
            });

            let token = jwt.sign({userid:CreateUser._id} , process.env.JWT_SECRET) ;
            res.cookie("token" , token);
            return res.status(200).json({message:"user created successfully" , token})
        })
    }
    catch(err){
        return res.status(500).json({message:`Error occur :- ${err.message}`})
    }
} 

const Login_user = async (req,res) =>{
    try {
        const {email , password} = req.body ;

        if(!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const Find_User = await User.findOne({email});
        if(!Find_User){
            return res.status(404).json({message:"User not found "}) ;
        }

        bcrypt.compare(password , Find_User.password , (err , result)=>{
            if(!result){
                return res.status(401).json({message:"Email or Password in mismatch"}) ;
            }
            let token = jwt.sign({userid:Find_User._id} , process.env.JWT_SECRET) ;
            res.cookie("token" , token);
            return res.status(200).json({message:"User Login successfully" , token})
        })
    }
    catch(err){
        return res.status(500).json({message:`${err.message}`})
    }
}

const Logout_User =  async(req , res)=>{
     try{
        res.clearCookie("token");
        return res.status(200).json({message:"User Logout successfully"})
     }
     catch(err){
        return res.status(401).json({message:`This is the err :- ${err.message}`})
     }
}

const get_user_data = async (req , res) =>{
    try{
        const token = req.cookies.token ;
        if(!token){
            return res.status(401).json({message:`Token not found`})
        }

        let decoded ;
        try{
            decoded = jwt.verify(token , process.env.JWT_SECRET);
        }
        catch(err){
            return res.status(500).json({message:`Error occur  :- ${err}`})
        }

        const user = await User.findById(decoded.userid).select("-password");
        if(!user){
            return res.status(404).json({message:`User not found`})
        }

        return res.status(200).json(user);
    }
    catch(err){
        return res.status(500).json({message:`Error occur :- ${err}`})
    }
}

module.exports = {Register_user , Login_user , Logout_User , get_user_data};