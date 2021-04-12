const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('../models/db');
// require('../config/passport');

function authController() {
    return {
        register(req, res) {
            res.render('./auth/register');
        },
        async postRegister(req, res, next) {
            const { name, email, password } = req.body;

            // Check email already exists or not
            let emailSql = `SELECT email FROM users WHERE email = '${req.body.email}'`
            console.log(emailSql)
            connection.query(emailSql, (err, result) => {
                console.log(result[0])
                if (result[0]) {
                    req.flash('error', 'Email already exists.');
                    req.flash('name', name);
                    req.flash('email', email);
                    return res.redirect('/register');
                }
            })

            // Hash password
            const hashPassword = await bcrypt.hash(password, 10);

            const user = {
                name: name,
                email: email,
                password: hashPassword
            }

            let sql = 'INSERT INTO users SET ?'

            let query = connection.query(sql, user, (err, result) => {
                if (err) {
                    req.flash('error', 'Someting went wrong');
                    res.redirect('/register');
                };
                req.flash('success', 'Registered successfully!!');
                res.redirect('/');
            });
        },
        login(req, res) {
            res.render('./auth/login');
        },
        postLogin(req, res, next) {
            const { email, password } = req.body;

            let sql = `SELECT * FROM users WHERE email = '${email}'`;
            connection.query(sql, (err, result) => {
                if (result) {
                    result.forEach(result => {
                        bcrypt.compare(password, result.password)
                            .then(match => {
                                if (match) {
                                    req.flash('success', 'Logged in successfully.');
                                    return res.redirect('/');
                                } else {
                                    req.flash('error', 'Wrong email or password.');
                                    return res.redirect('/login');
                                }
                            }).catch(err => {
                                req.flash('error', 'Something went wrong.');
                                return res.redirect('/login');
                            })
                    })

                } else {
                    req.flash('error', 'Email does not exist.');
                    return res.redirect('/login');
                }
            })
        }
    }
}

module.exports = authController