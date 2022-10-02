const express = require('express')
const router = express.Router()
const sql = require('../module/sql/ai')
const db = require('../module/database/db_control')
router.get('/', function (req, res, next) {
    res.render('ai', {title: 'Express'});
});

router.post('/response', function (req, res) {
    try {
        const pid = req.body.pid;
        const _confirm = req.body._confirm;
        const message = req.body.message;

        db.run(sql.pnum_update, [pid], function (err, data) {
            if (err == null) {
                db.run(sql.upload, [data[0].pid, _confirm, message], function (err2, data2) {
                    if (data2[0] != undefined) res.json({message: "200", data: data2[0]})
                    else res.json({message: "200", data: "404"})
                });
            } else res.json({message: "400"})
        });
    } catch (e) {
        res.json({message: "500"})
    }
});

router.post('/url', function (req, res) {
    try {
        const url = req.body.url;
        db.run(sql.url_check, [url], function (err, data) {
            if (data[0] != undefined) res.json({message: "200", data: data[0]})
            else res.json({message: "200", data: {confirm: -1}})
        });
    } catch (e) {
        res.json({message: "500"})
    }
});

router.post('/insert_url', function (req, res) {
    try {
        const url = req.body.url;
        const confirm = req.body._confirm;
        const pid = req.body.pid;

        db.run(sql.pnum_update, [pid], function (err, data) {
            if (err == null) {
                db.run(sql.insert_url, [url, confirm, data[0].pid], function (err2, data2) {
                    res.json({message: "200"})
                });
            } else res.json({message: "400"})
        });
    } catch (e) {
        res.json({message: "500"});
    }
});

module.exports = router;