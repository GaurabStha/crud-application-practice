const connection = require('../models/db');

function homeController() {
    return {
        home(req, res) {
            let sql = 'SELECT * FROM lists'
            let query = connection.query(sql, (err, rows) => {
                    if (err) throw err;
                    res.render('home', {
                        lists: rows
                    });
                })
                // res.render('./home');
        }
    }
}

module.exports = homeController