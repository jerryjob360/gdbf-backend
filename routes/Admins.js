const express = require('express');
const router = express.Router();
const { Admins } = require('../models');
const bcrypt = require("bcryptjs");
const { sign } =require('jsonwebtoken');
const { validateToken } = require('../middleware/AuthMiddleware');


router.get("/", async (req, res) => {
    const listOfAdmins = await Admins.findAll();
    res.json(listOfAdmins);
});

router.post("/", validateToken ,async (req, res) => {
    const { username, password } = req.body;
    await bcrypt.hash(password, 10).then((hash) => {
        Admins.create({
            username: username,
            password: hash,
        });
        res.json(username);
    });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const admin = await Admins.findOne({ where: { username:username } });

    if (!admin) res.json({ error: "Admin doesn't exist" });

    bcrypt.compare(password, admin.password).then((match) =>{
        if (!match) {
            res.json({ error: "Wrong password!" });
        }
        else{
            //for correct credentials provided, create a token.
            const accessToken = sign({username: admin.username, id: admin.id}, "important secret");
            const name = admin.username;
            const loggedAdmin = {
                username: name,
                accessToken: accessToken
            }
            res.json(loggedAdmin);
        }
    });
});

router.get('auth', validateToken, (req,res) => {
    res.json(req);
});

module.exports = router;