function update() {
    return "select ai($0,$1,$2) as qid"
}

function url_check(){
    return "select confirm from url where url=$0"
}

function insert_url(){
    return "INSERT INTO senior.url (url, confirm, pid) VALUES ($0, $1, $2)"
}

;function p_update() {
    return "SELECT phone_update($0) as pid"
}

module.exports.url_check = url_check();
module.exports.insert_url = insert_url();
module.exports.upload = update()
module.exports.pnum_update = p_update();