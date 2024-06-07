const express = require("express");
const zod = require("zod");
const mongoose = require("mongoose");
const router = express.Router();
const {Account} = require("../db");
const authMiddleware = require("../middleware")

//route for getting personal balance
router.get("/balance", authMiddleware, async (req, res)=>{
    const account = await Account.findOne({
        userId: req.userId
    })

    res.status(200).json({        
        balance: account.balance.toFixed(3)
    })
})

router.post("/transfer", authMiddleware, async (req, res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();

    const {amount, to} = req.body;
    if(amount <= 0){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Enter valid amount"
        })
    }

    if(to == req.userId){
        await session.abortTransaction();
        return res.status(400).json({
            message: "You cannot send money to self account"
        })
    }

    //fetch the accounts
    const account = await Account.findOne({userId: req.userId}).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({userId: to}).session(session)

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account"
        })
    }

    //perform transactions
    await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session)
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session)

    //commit transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    })
})

module.exports = router;