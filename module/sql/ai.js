function update() {
    return "select ai($0,$1,$2,$3) as qid"
}

function url_check(){
    return "select confirm from url where url=$0"
}

function insert_url(){
    return "INSERT INTO senior.url (url, confirm, pid) VALUES ($0, $1, $2)"
}

module.exports.upload = update();
module.exports.url_check = url_check();
module.exports.insert_url = insert_url();