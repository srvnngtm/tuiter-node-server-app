import * as usersDao from "./users-dao.js";

var currentUserVar;


const AuthController = (app) => {


  const register = async (req, res) => {
    const username = req.body.username;
    const user = await usersDao.findUserByUsername(username);
    if (user) {
      res.sendStatus(409);
      return;
    }
    const newUser = await usersDao.createUser(req.body);
    currentUserVar = newUser;
    res.json(newUser);
  };

  const login = async (req, res) => {
    console.log("currently logging in")
    const username = req.body.username;
    const password = req.body.password;
    const user = await usersDao.findUserByCredentials(username, password);
    console.log("logging in : " + user);
    if (user) {
      currentUserVar = user;
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  };

  const profile = async (req, res) => {
    const currentUser = currentUserVar;
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
  };

  const logout = async (req, res) => {
    console.log("signing off")
    req.session.destroy();
    res.sendStatus(200);
  };

  const update = async (req, res) => {
    const currUser = await usersDao.updateUser(req.params.uid, req.body);
    if (currUser) {
      currentUserVar = currUser;
      return res.json(currentUserVar);
    } else {
      res.sendStatus(500);
    }
  };

  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
  app.put("/api/users/:uid", update);
};
export default AuthController;