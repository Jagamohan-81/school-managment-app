const db = require("../configuration/dbConn");

module.exports = {
  findUserExistance: async (email) => {
    return new Promise((resolve, reject) => {
      db.any("select * from user_tbl where user_email =($1)", [email])
        .then((data) => {
          if (data.length > 0) {
            resolve({ success: true });
          } else {
            resolve(false);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  findStudentExistance: async (email) => {
    return new Promise((resolve, reject) => {
      db.any("select * from students_tbl where email =($1)", [email])
        .then((data) => {
          if (data.length > 0) {
            resolve({ success: true });
          } else {
            resolve(false);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  userRegisterModal: async (data) => {
    return new Promise((resolve, reject) => {
      db.one(
        "INSERT INTO user_tbl(user_name,user_email,user_password,user_role,created_at) VALUES ($1,$2,$3,$4,$5) RETURNING user_id",
        [data.name, data.email, data.password, data.role, data.created_at]
      )
        .then(function (data) {
          resolve(data);
        })
        .catch(function (err) {
          console.log(err);
          reject(err);
        });
    });
  },
  studentRegisterModel: async (data) => {
    return new Promise((resolve, reject) => {
      db.one(
        "INSERT INTO students_tbl(name,roll_no,class_name,section,contact_no,profile_pic,email,password,created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id",
        [
          data.name,
          data.roll_no,
          data.class_name,
          data.section,
          data.contact_no,
          data.profile_pic,
          data.email,
          data.password,
          data.created_at,
        ]
      )
        .then(function (data) {
          resolve(data);
        })
        .catch(function (err) {
          console.log(err);
          reject(err);
        });
    });
  },
  userLoginByEmail: async (data) => {
    return new Promise((resolve, reject) => {
      db.oneOrNone("SELECT * FROM user_tbl WHERE user_email = $1", [data])
        .then(function (user) {
          if (user) {
            resolve(user);
          } else {
            resolve(null);
          }
        })
        .catch(function (err) {
          console.log(err);
          reject(err);
        });
    });
  },
  studentLoginByEmail: async (data) => {
    return new Promise((resolve, reject) => {
      db.oneOrNone("SELECT * FROM students_tbl WHERE email = $1", [data])
        .then(function (user) {
          if (user) {
            resolve(user);
          } else {
            resolve(null);
          }
        })
        .catch(function (err) {
          console.log(err);
          reject(err);
        });
    });
  },
  getUserDetailsById: async (id) => {
    return new Promise((resolve, reject) => {
      db.oneOrNone("SELECT * FROM user_tbl WHERE user_id = $1", [id])
        .then(function (user) {
          if (user) {
            console.log("user details----", user);
            resolve(user);
          } else {
            resolve(null);
          }
        })
        .catch(function (err) {
          console.log(err);
          reject(err);
        });
    });
  },
};
