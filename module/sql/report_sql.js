function report_num(){
    return "INSERT INTO senior.report (uid,text,pid,reported) VALUES ($0,$1,$2,now())"
}

function p_update() {
    return "SELECT phone_update($0) as pid"
}

function text_response(){
    return "SELECT text FROM senior.report AS a JOIN phone as b ON a.pid=b.pid WHERE b.num=$0"
}
function recent_list(){
    return "SELECT * FROM recent_list"
}

module.exports.report_num = report_num();
module.exports.pnum_update = p_update();
module.exports.text_response = text_response();
module.exports.recent_list=recent_list();