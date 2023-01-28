const { Router } = require('express');
const express=require('express');
const { readCSv,upload,home } = require('../contollers/CsvController');


const router=Router();

router.get('/',home);

router.post('/upload',upload.single('csv_file'),function(req,res){
    // return res.render('index',{});
    return res.redirect('back');
})


module.exports=router