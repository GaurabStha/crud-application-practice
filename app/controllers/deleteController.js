const connection = require("../models/db");

function deleteController() {
    return {
        delete(req, res) {
            let id = req.params.id;
            let sql = `DELETE FROM lists WHERE id = ${id}`
            let query = connection.query(sql, (err, result) => {
                if (err) throw err;
                res.redirect('/')
            })
        }
    }
}

module.exports = deleteController