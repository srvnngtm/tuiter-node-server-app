import * as usersDao from "./users-dao.js";



const AuthController = (app) => {


  // const register = async (req, res) => {
  //   const username = req.body.username;
  //   const user = await usersDao.findUserByUsername(username);
  //   if (user) {
  //     res.sendStatus(409);
  //     return;
  //   }
  //   const newUser = await usersDao.createUser(req.body);
  //   currentUserVar = newUser;
  //   res.json(newUser);
  // };


  const register = async (req, res) => {
    const user = await usersDao.findUserByUsername(req.body.username);
    if (user) {
      res.sendStatus(403);
      return;
    }
    const newUser = await usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };
  


  const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      const user = await usersDao.findUserByCredentials(username, password);
      if (user) {
        console.log(user)
        req.session["currentUser"] = user;
        res.json(user);
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  };
  

  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    console.log(currentUser)
    if (currentUser) {
      res.json(currentUser);
    }else{
      res.sendStatus(403);
    }
    
  };

  const logout = async (req, res) => {
    console.log("signing off")
    req.session.destroy();
    res.sendStatus(200);
  };

  // const update = async (req, res) => {
  //   const currUser = await usersDao.updateUser(req.params.uid, req.body);
  //   if (currUser) {
  //     currentUserVar = currUser;
  //     return res.json(currentUserVar);
  //   } else {
  //     res.sendStatus(500);
  //   }
  // };

  const update = async (req, res) => {
    const id = req.params.id;
    const status = await usersDao.updateUser(id, req.body);
    const user = await usersDao.findUserById(id);
    req.session["currentUser"] = user;
    res.json(status);
  };
  



  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
  app.put("/api/users/:uid", update);
};
export default AuthController;