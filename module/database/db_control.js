const db = require('./db_conn');
const {NULL} = require("mysql/lib/protocol/constants/types");

function run(sql, value, callback){
    let query = sqlBuilder(sql, value)
    ExecuteQuery(query, [], function (err,data){
        let js = JSON.stringify(data);
        js = JSON.parse(js);
        return callback(err, js);
    });
}

function sqlBuilder(sql, data){
    let i;
    for (i=0;i<data.length;i++){
        if (data[i]=='') {
            sql = sql.replace('$' + i.toString(), 'NULL');
        }
        else sql = sql.replace('$'+i.toString(), JSON.stringify(data[i]));
    }
    return sql;
}

function ExecuteQuery(q, value, callback){
    try{
        db((err,connection)=> {
            connection.query(q, value, (err,rows)=>{
                connection.release();
                if(err){
                    return callback(err, err);
                }
                return callback(err,rows);
            });
        })
    } catch (e){
        return callback(e,null);
    }
}

module.exports.run = run;
module.exports.sql = sqlBuilder;