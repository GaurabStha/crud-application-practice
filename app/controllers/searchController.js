const connection = require('../models/db');

function searchController() {
    return {
        search(req, res) {
            const { search } = req.query;

            let sql = `SELECT * FROM lists WHERE name LIKE '%${search}%'`
            let query = connection.query(sql, (err, rows) => {
                if (err) throw err;
                res.render('home', {
                    lists: rows
                });
            })
        }
    }
}

module.exports = searchController