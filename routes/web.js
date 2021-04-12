const homeController = require('../app/controllers/homeController');
const authController = require('../app/controllers/authController');
const addBookController = require('../app/controllers/addBookController');
const editController = require('../app/controllers/editController');
const deleteController = require('../app/controllers/deleteController');
const searchController = require('../app/controllers/searchController');

function initRoutes(app) {
    app.get('/', homeController().home);
    app.get('/register', authController().register);
    app.post('/register', authController().postRegister);
    app.get('/login', authController().login);
    app.post('/login', authController().postLogin);

    // Book routes
    app.get('/addbook', addBookController().addBook);
    app.post('/addbook', addBookController().postAddBook);
    app.get('/edit/:id', editController().edit);
    app.post('/edit/:id', editController().postEdit);
    app.get('/delete/:id', deleteController().delete);
    app.get('/search', searchController().search);
}

module.exports = initRoutes