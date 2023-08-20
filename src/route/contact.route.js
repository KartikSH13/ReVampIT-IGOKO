import { body } from "express-validator";
import { validationResult } from "express-validator";
import express from 'express'
import email from "../services/email.js";
const contactRouter = express.Router();
contactRouter.post('/igoko', [
    body('username').notEmpty().withMessage("Name can't be empty"),
    body('email').notEmpty().isEmail().withMessage("Email can't be empty"),
    body('phone').notEmpty().isMobilePhone().withMessage("Phone number can't be empty"),
    body('country').notEmpty().withMessage("Country can't be empty")
], (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("error")
            return res.status(400).send({ status: false, message: errors.array() });
        }

        email(req.body.email, req.body.username, "Contact Request send successfully", "<b>Hi " + req.body.username + " !</b><br/><b>We have got your request for meeting</b><br/><b>Thank you for your interest and reaching out to us</b><b>Our team will quickly get to you .</b><br/><b>Thanks & Regards,</b><br/><b>Igoko Avionics Solutions Pvt ltd</b>");

        email("0863cs201070@piemr.edu.in", "HR", "New contact request from " + req.body.username, `<b>Name : ${req.body.username}</b><br/><b>Email :${req.body.email}</b><br/><b>Phone number :${req.body.phone}</b><br/><b>Country : ${req.body.country}</b><br/><b>Comments : ${req.body.comments}</b>`)

        res.status(200).json({message: "Success full" });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error")
    }
})

export default contactRouter