
function login(){
    return "select * from account where id=$0 and pw=$1"
}

function p_update(){
    return "SELECT phone_update($0) as res"
}

function sign(){
    return "INSERT INTO senior.account (id, pw, pid) VALUES ($0, $1,$2)"
}

function id_check(){
    return "select count(*) from account where id=$0"
}

function change(){
    return "UPDATE senior.account SET id=$1 , pw=$2, phone=$3 WHERE uid=$0"
}
function info_check(){
    return "select * from account where uid=$0"
}
function withdrawal(){
    return "DELETE FROM senior.account WHERE id=$0"
}

function select() {
    return "SELECT * FROM account WHERE uid=$0"
}
function refresh(){
    return "INSERT INTO senior.token (refresh, tokened) VALUES ($0,now())"
}

function refreshck(){
    return "SELECT * from token WHERE refresh=$0"
}

module.exports.login = login();
module.exports.pnum_update=p_update();
module.exports.sign = sign();
module.exports.id_check = id_check();
module.exports.info_check=info_check();
module.exports.change= change();
module.exports.withdrawal= withdrawal();
module.exports.select= select();
module.exports.refresh = refresh();
module.exports.refreshck=refreshck();