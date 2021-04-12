const connection = require('../models/db');

function editController() {
    return {
        edit(req, res) {
            let id = req.params.id;
            let sql = `SELECT * FROM lists WHERE id = ${id}`
            let query = connection.query(sql, (err, result) => {
                if (err) throw err;
                res.render('editBook', {
                    book: result[0]
                });
            })

        },
        postEdit(req, res) {
            const { name, isbn, author } = req.body;

            const book = {
                name: name,
                isbn: isbn,
                author: author
            }

            const id = req.params.id;

            let sql = `UPDATE lists SET name='${book.name}', isbn='${book.isbn}', author='${book.author}' WHERE id = ${id}`
            let query = connection.query(sql, (err, result) => {
                if (err) throw err;
                res.redirect('/')
            })
        }
    }
}

module.exports = editController