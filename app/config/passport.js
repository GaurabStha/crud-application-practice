const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const collection = require('../models/db');

function init(passport) {
    passport.use('local', new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        // Check if email exists
        let sql = `SELECT * FROM users WHERE email = ?`
        const user = collection.query(sql, req.body.email, (err, result) => {
            console.log(result)
            if (err) throw err;
        });

        if (!user) {
            return done(null, false, { message: 'No user with this email.' })
        }

        bcrypt.compare(password, user.password, (err, match) => {
                if (match) {
                    if (match) {
                        return done(null, user, { message: 'Logged in successfully.' });
                    }
                    return done(null, false, { message: 'Wrong username or password.' });
                } else {
                    return done(null, false, { message: 'Something went wrong.' });
                }
            })
            // .then(match => {
            //     if (match) {
            //         return done(null, user, { message: 'Logged in successfully.' });
            //     }
            //     return done(null, false, { message: 'Wrong username or password.' });
            // }).catch(err => {
            //     return done(null, false, { message: 'Something went wrong.' });
            // })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        let sql = `SELECT * FROM users WHERE id = ${id}`
        let query = collection.query(sql, (err, user) => {
            done(err, user);
        })
    })
}

// module.exports = init