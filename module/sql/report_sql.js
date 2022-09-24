function report_num(){
    return "INSERT INTO senior.report (uid,text,pid,reported) VALUES ($0,$1,$2,now())"
}

module.exports.report_num = report_num();