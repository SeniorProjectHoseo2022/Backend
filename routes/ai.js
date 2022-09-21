const express = require('express')
const router = express.Router()
const sql = require('../module/sql/ai')
const db = require('../module/database/db_control')
router.get('/', function(req, res, next) {
    res.render('ai', { title: 'Express' });
});

router.post('/response', function (req,res){
    try {
        const uid = req.body.uid;
        const _confirm = req.body._confirm;
        const message = req.body.message;
        const pid = req.body.pid;
        db.run(sql.upload,[uid, _confirm, message, pid],function (err,data){
            if(data[0]!=undefined)  res.json({message:"200", data:data[0]})
            else res.json({message:"200", data:"404"})
        });
    }catch (e){
        res.json({message:"500"})
    }
});

router.post('/url', function (req,res){
    try {
        const url = req.body.url;
        db.run(sql.url_check,[url],function (err,data){
            if(data[0]!=undefined)  res.json({message:"200", data:data[0]})
            else  res.json({message:"200",data:{confirm:-1}})
        });
    }catch (e){
        res.json({message:"500"})
    }
});

router.post('/insert_url', function (req,res){
    try {
        const url = req.body.url;
        const confirm = req.body._confirm;
        const pid = req.body.pid;

        db.run(sql.insert_url,[url,confirm,pid],function (err,data){
            res.json({message:"200"})
        });
    }catch (e){
        res.json({message:"500"})
    }
});

module.exports = router;