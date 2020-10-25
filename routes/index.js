const express = require('express');
const { ensureNotAuthenticated } = require('../config/auth')
const router = express.Router();

router.get("/",ensureNotAuthenticated,(req,res)=>{
    res.render('index');
})

module.exports = router;