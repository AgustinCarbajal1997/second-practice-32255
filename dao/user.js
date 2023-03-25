const User = require("../models/user");

class UserDao {
  async insertOne(newUser) {
    try {
      const user = await User.create(newUser);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOne(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserDao;
