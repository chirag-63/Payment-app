const express = require('express');
const zod = require('zod');
const { User, Account } = require('../db');
const JWT_SECRET = require('../config');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware')

//zod schema for input validation
const signupSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})
const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})
const updateSchema = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional()
})

//user signup route
router.post("/signup", async (req, res) => {
    const body = req.body
    const parsedBody = signupSchema.safeParse(body)
    //input validation
    if (!parsedBody.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    //checks if username exists in db
    const existingUser = await User.findOne({
        username: body.username
    })
    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    //creates a new user
    const user = await User.create({
        username: body.username,
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.password,
    })
    const userId = user._id;

    //assign a random dummy balance to user
    await Account.create({
        userId,
        balance: 1 + Math.random()*10000
    })

    //jwt sign
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    //final response 
    res.json({
        message: "User created successfully",
        token: token
    })

})

//user signin route
router.post("/signin", async(req, res) => {
    const body = req.body
    const {success} = signinSchema.safeParse(body)

    if(!success){
        return res.status(411).json({
            message: "Invalid inputs"
        })
    }

    const existingUser = await User.findOne({
        username: body.username,
        password: body.password
    })

    if(!existingUser || existingUser.password !== body.password){
        res.status(411).json({
            message: "Invalid username or password"
        })
        return
    }

    const token = jwt.sign({
        userId: existingUser._id
    }, JWT_SECRET);

    res.json({
        token: token
    })
})

//user update route
router.put("/", authMiddleware, async (req, res)=>{
    const body = req.body;
    const {success} = updateSchema.safeParse(body)

    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({
        _id: req.userId
    }, req.body)

    res.json({
        message: "Updated successfully"
    })
})

//for searching a user via substring
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;
