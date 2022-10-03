const express = require('express')
const router = express.Router()
const sql = require('../module/sql/report_sql')
const db = require('../module/database/db_control')
const token = require("../module/token/token");
const {verifyToken} = require("../module/token/check");

router.get('/', function(req, res, next) {
    res.render('report', { title: 'Express' });
});

router.get('/text_response', function (req, res) {
    try {
        const pnum = req.body.pnum;

        db.run(sql.text_response, [pnum], function (err, data) {
            if (data != undefined) res.json({message: "200", text : data})
            else res.json({message: "200", data: "404"})
        })
    } catch (e) {
        res.json({message: "500"})
    }
})

router.get('/recent_list', function (req, res) {
    try {
        db.run(sql.recent_list,"", function (err, data) {
            if (data != undefined) res.json({message: "200", text : data})
            else res.json({message: "200", data: "404"})
        })
    } catch (e) {
        res.json({message: "500"})
    }
})


router.post('/report_num', verifyToken,function (req,res){
    try {
        const uid=req.decryption.uid;
        const text=req.body.text;
        const pid=req.body.pid;

        db.run(sql.pnum_update, [pid], function (err, data) {
            if (err==null) {
                db.run(sql.report_num,[uid,text,data[0].pid],function (err2,data2){
                    if(err2 == null) res.json({message:"200"})
                    else res.json({message:"500", errno:err2.errno})
                })
            } else res.json({message: "400"})
        });
    }catch (e){
        res.json({message:"500"})
    }
})

module.exports = router;

