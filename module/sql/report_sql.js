function report_num(){
    return "INSERT INTO senior.report (uid,text,reported) VALUES ($0,$1,now())"
}

module.exports.report_num = report_num();