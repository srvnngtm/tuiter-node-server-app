let users = [];


export const findAllUsers = () => users;


export const findUserById = (uid) => {
 const index = users.findIndex((u) => u._id === uid);
 if (index !== -1) return users[index];
 return null;
};


export const findUserByUsername = (username) => {
 const index = users.findIndex((u) => u.username === username);
 if (index !== -1) return users[index];
 return null;
};


export const findUserByCredentials = (username, password) => {
 const index = users.findIndex((u) => u.username === username && u.password === password);
 console.log("current users :  " + users)
 if (index !== -1) return users[index];
 return null;
};



export const createUser = (user) =>{
    users.push(user);
    console.log(users)
    return user
} 


export const updateUser = (uid, user) => {
console.log("updating for uid :" + uid);

// users.map((e)=> console.log(e._id))
// console.log("list of all users : " + users);

 const index = users.findIndex((u) => u._id == uid);
 users[index] = { ...users[index], ...user };
 console.log("user found at : " + index);
 return users[index]
};


export const deleteUser = (uid) => {
 const index = users.findIndex((u) => u._id === uid);
 users.splice(index, 1);
 return {status: 'ok'}
};
