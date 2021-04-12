const connection = require('../models/db');

function addBookController() {
    return {
        addBook(req, res) {
            res.render('./addBook');
        },
        postAddBook(req, res) {
            const { name, isbn, author } = req.body;

            const book = {
                name: name,
                isbn: isbn,
                author: author
            }

            let sql = 'INSERT INTO lists SET ?'

            let query = connection.query(sql, book, (err, result) => {
                if (err) {
                    req.flash('error', 'Someting went wrong');
                    res.redirect('/addbook');
                };
                res.redirect('/')
            });
        }
    }
}

module.exports = addBookController