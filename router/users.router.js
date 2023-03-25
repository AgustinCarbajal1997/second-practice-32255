const Route = require("./router");
const UserDao = require("../dao/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = new UserDao();
class UserRouter extends Route {
  init() {
    this.post("/user/register", async (req, res) => {
      try {
        let newUser = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          age: req.body.age,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
        };
        const data = await user.insertOne(newUser);

        res.sendSuccess("User create");
      } catch (error) {
        res.sendServerError(`Something went wrong, ${error}`);
      }
    });

    this.post("/user/login", async (req, res) => {
      try {
        const { email, password } = req.body;

        const data = await user.findOne(email); //traigo el usuario si existe

        const match = await bcrypt.compare(password, data.password);
        if (!match) return res.sendUserError("Incorrect password");

        let token = jwt.sign({ email, role: data.role }, "secreto");

        res.sendSuccess({ token });
      } catch (error) {
        res.sendServerError(`Something went wrong, ${error}`);
      }
    });

    this.get("/user/public", ["PUBLIC"], (req, res) => {
      res.sendSuccess("Hola desde endpoint publico");
    });

    this.get("/user/privateUser", ["USER"], (req, res) => {
      res.sendSuccess("Hola desde endpoint al que solo pueden acceder users");
    });

    this.get("/user/privateAdmin", ["ADMIN"], (req, res) => {
      res.sendSuccess("Hola desde endpoint al que solo puede acceder admin");
    });
  }
}

module.exports = UserRouter;
