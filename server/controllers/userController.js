import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register Student : /api/user/register
export const register = async (req, res)=>{
    try {
        console.log('📝 Registration attempt:', req.body);
        const { name, email, password, studentId, phoneNumber } = req.body;

        console.log('🔍 Received fields:', {
            name: !!name,
            email: !!email, 
            password: !!password,
            studentId: !!studentId,
            phoneNumber: !!phoneNumber
        });

        if(!name || !email || !password || !studentId || !phoneNumber){
            console.log('❌ Missing required fields');
            return res.json({success: false, message: 'All fields are required'})
        }

        const existingUser = await User.findOne({$or: [{email}, {studentId}]})

        if(existingUser)
            return res.json({success: false, message: 'Student already exists with this email or student ID'})

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name, 
            email, 
            password: hashedPassword, 
            studentId, 
            phoneNumber,
            membershipDate: new Date()
        })

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true, // Prevent JavaScript to access cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time
        })

        return res.json({success: true, user: {
            email: user.email, 
            name: user.name, 
            studentId: user.studentId,
            phoneNumber: user.phoneNumber
        }})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Login User : /api/user/login

export const login = async (req, res)=>{
    try {
        const { email, password } = req.body;

        if(!email || !password)
            return res.json({success: false, message: 'Email and password are required'});
        const user = await User.findOne({email});

        if(!user){
            return res.json({success: false, message: 'Invalid email or password'});
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch)
            return res.json({success: false, message: 'Invalid email or password'});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.json({success: true, user: {
            email: user.email, 
            name: user.name, 
            studentId: user.studentId,
            phoneNumber: user.phoneNumber
        }})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


// Check Auth : /api/user/is-auth
export const isAuth = async (req, res)=>{
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.json({ success: false, message: 'User ID not found' });
        }
        const user = await User.findById(userId).select("-password")
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        return res.json({success: true, user})

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Logout User : /api/user/logout

export const logout = async (req, res)=>{
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: "Logged Out" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}