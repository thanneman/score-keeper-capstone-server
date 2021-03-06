const xss = require('xss')
const bcrypt = require('bcryptjs')

const REGEX_UPPER_LOWER_NUMBER = /(?=.*[a-z])(?=.*[A-Z])[\S]+/

const UsersService = {
    getAllUsers(knex) {
        return knex.select('*').from('users')
    },
    hasUserWithUserName(db, email) {
        return db('users')
            .where({ email })
            .first()
            .then(user => !!user)
    },
    insertUser(db, newUser) {
        return db
            .insert(newUser)
            .into('users')
            .returning('*')
            .then(([user]) => user)
    },
    validatePassword(password) {
        if (password.length < 6) {
            return 'Password must be longer than 6 characters'
        }
        if (password.length > 20) {
            return 'Password must be less than 20 characters'
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return 'Password must not start or end with empty spaces'
        }
        if (!REGEX_UPPER_LOWER_NUMBER.test(password)) {
            return 'Password must contain 1 upper case, lower case, and a number'
        }
        return null
    },
    hashPassword(password) {
        return bcrypt.hash(password, 12)
    },
    serializeUser(user) {
        return {
            id: user.id,
            email: xss(user.email),
            date_created: new Date(user.date_created),
        }
    },
    serializeGame(game){
        return {
        id: game.id,
        course_name: game.course_name,
        date: game.date,
        course_par: game.course_par,
        front_score: game.front_score,
        back_score: game.back_score,
        notes: xss(game.notes),
        }
    },
    deleteUser(knex, id) {
        return knex
            .from('users')
            .where({ id })
            .delete()
    },
    getById(knex, id) {
        return knex
            .from('users')
            .select('*')
            .where('id', id)
            .first()
    },
    getGamesById(knex, id) {
        return knex
            .from('games')
            .select('*')
            .where('user_id', id)
    }
}

module.exports = UsersService