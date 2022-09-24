const express = require('express')
const router = express.Router()
const sql = require('../module/sql/account_sql')
const db = require('../module/database/db_control')
const token = require('../module/token/token');
const {verifyToken} = require('../module/token/check');
const check = require("jsonwebtoken");
const {decryption, lgToken} = require("../module/token/token");

router.get('/', function (req, res, next) {
    res.render('account', {title: 'Express'});
});

router.post('/login', function (req, res) {
    try {
        const id = req.body.id;
        const pw = req.body.pw;
        db.run(sql.login, [id, pw], function (err, data) {
            if (data[0] != undefined) {res.json(token.lgToken(data[0]["uid"]))
            }
            else res.json({message: "404"})
        });
    } catch (e) {
        res.json({message: "500"})
    }
})

router.post('/sign', function (req, res) {
    try {
        const id = req.body.id;
        const pw = req.body.pw;
        const phone = req.body.phone;
        db.run(sql.sign, [id, pw], function (err, data) {
            if (err == null)
                res.json({message: "200"})
            else
                res.json({message: "500", errno: err.errno})
        });
    } catch (e) {
        res.json({message: "400"})
    }
})

router.post('/pnum_update', function (req,res){
    try {
        const pnum = req.body.pnum;
        db.run(sql.pnum_update,[pnum],function (err,data){
            if(data[0]!=undefined)  res.json({message:"200", data:data[0]})
            else res.json({message:"200", data:"404"})
        });
    }catch (e){
        res.json({message:"500"})
    }
})

router.post('/id_check', function (req, res) {
    try {
        const id = req.body.id;
        db.run(sql.id_check, [id], function (err, data) {
            const c = data[0]["count(*)"];
            if (err == null) res.json({message: "200", data: c})
            else res.json({message: "500", errno: err.errno})
        })
    } catch (e) {
        res.json({message: "500"})
    }
})

router.post('/change', function (req, res) {
    try {
        const uid = req.body.uid;
        const id = req.body.id;
        const pw = req.body.pw;
        const phone = req.body.phone;
        db.run(sql.info_check, [uid], function (err, data) {
            if (data[0] != undefined) {
                db.run(sql.change, [uid, id, pw, phone], function (err2, data2) {
                    if (err2 == null) res.json({message: "200"})
                    else res.json({message: "500", errno: err2.errno})
                })
            } else res.json({message: "500"})
        });
    } catch (e) {
        res.json({message: "500"})
    }
})

router.post('/withdrawal', function (req, res) {
    try {
        const id = req.body.id;
        const pw = req.body.pw;
        db.run(sql.login, [id, pw], function (err, data) {
            if (data[0] != undefined) {
                db.run(sql.withdrawal, [id, pw], function (err2, data2) {
                    if (err2 == null) res.json({message: "200"})
                    else res.json({message: "500", errno: err2.errno})
                })
            } else res.json({message: "500"})
        });
    } catch (e) {
        res.json({message: "500"})
    }
})

router.post('/select', function (req, res) {
    try {
        const uid = req.body.uid;
        db.run(sql.select, [uid], function (err, data) {
            if (data[0] != undefined) res.json(data);
            else res.json({message: "200", data: "404"})
        })
    } catch (e) {
        res.json({message: "500"})
    }
})

router.post('/verify', verifyToken, function (req, res) {
    res.json({message: 200, decryption: req.decryption})
})


router.post('/refresh', function (req,res){
    const rft = req.body.rft;
    db.run(sql.refreshck, [rft], function (err, data) {
        if (data[0] != undefined) {
            const decrypt= decryption(data[0]["refresh"]);
            res.json(token.lgToken(data[0][decrypt.uid]));
        }
        else res.json({message: "NO TOKEN", data: "404"})
    });

})
module.exports = router;