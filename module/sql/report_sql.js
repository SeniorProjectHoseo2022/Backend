function report_num(){
    return "INSERT INTO senior.report (uid,text,pid,reported) VALUES ($0,$1,$2,now())"
}

function p_update() {
    return "SELECT pid_update($0) as pid"
}

module.exports.report_num = report_num();
module.exports.pnum_update = p_update();
