const express = require('express');
const { ensureAuthenticated } = require('../config/auth')
const router = express.Router();

router.get('/',ensureAuthenticated,(req,res)=>{
    const { name,email,category } = req.user;
    res.render('dashboard',{ name,email,category });
})

module.exports = router;