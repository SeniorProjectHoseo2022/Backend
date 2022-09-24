const express = require('express')
const router = express.Router()
const sql = require('../module/sql/report_sql')
const db = require('../module/database/db_control')

router.get('/', function(req, res, next) {
    res.render('report', { title: 'Express' });
});

router.post('/report_num', function (req,res){
    try {
        const uid=req.body.uid;
        const text=req.body.text;
        const pid=req.body.pid;
        db.run(sql.report_num,[uid,text,pid],function (err,data){
            if(err == null) res.json({message:"200"})
            else res.json({message:"500", errno:err.errno})
        });
    }catch (e){
        res.json({message:"500"})
    }
})

module.exports = router;

