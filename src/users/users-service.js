const bcrypt = require("bcryptjs");
const xss = require("xss");

const UserService = {
  hasUserWithUserName(db, userName) {
    return db("users")
      .where("username", userName)
      .first()
      .then(user => !!user);
  },
  insertUser(db, newUser) {
    return db
    .insert(newUser)
    .into("users")
    .returning('*')
    .then(([user]) => user)

  },
  validatePassword(db) {
    
  },
  serializeUser(user) {
    return {
      id: user.id,
      username: xss(user.username),
      date_created: new Date(user.date_created)
    };
  },

  hashPassword(password) {
    return bcrypt.hash(password, 12);
  }

};

  

module.exports = UserService;
