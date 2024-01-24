const db = require("../DB/db");
const dbconnect = db();
const { generateResetToken } = require("../utils/utilityFunction");
const nodemailer = require("nodemailer");
//function for insert new user data to database

const createUser = async (username, password, email) => {
  const q =
    "INSERT INTO login_info(username, password, email) VALUES (?, ?, ?)";
  try {
    const result = await new Promise((resolve, reject) => {
      dbconnect.query(q, [username, password, email], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return result.insertId;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const findUser = async (email) => {
  const query = "SELECT * FROM login_info WHERE email=? LIMIT 1";
  try {
    const user = await new Promise((resolve, reject) => {
      dbconnect.query(query, [email], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return user[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getUserData = async (user_id) => {
  const query =
    "SELECT user_id,username,email FROM login_info WHERE user_id=? LIMIT 1";
  try {
    const user = await new Promise((resolve, reject) => {
      dbconnect.query(query, [user_id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return user[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updatePassword = async (password, email) => {
  const query = "UPDATE login_info SET password=? WHERE email=?";
  try {
    const result = await new Promise((resolve, reject) => {
      dbconnect.query(query, [password, email], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const sendEmail = async (email) => {
  const reset_token = generateResetToken(email);
  const reset_token_expire = Date.now() + 10 * 60 * 1000;
  const query =
    "UPDATE login_info SET reset_token=? , reset_token_expires=? WHERE email=?";
  try {
    const user = await new Promise((resolve, reject) => {
      dbconnect.query(
        query,
        [reset_token, reset_token_expire, email],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
    console.log(user);
    if (user.changedRows === 1) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "justlogin234@gmail.com",
          pass: "oslq bkri tiit mbmr",
        },
      });
      const resetlink = `http://localhost:5173/ResetPassword/${reset_token}`;
      const mailOptions = {
        from: "justlogin234@gmail.com",
        to: email,
        subject: "Password Reset",
        html: `<p>Click the following link to reset your password: <a href="${resetlink}">Reset password</a></p>`,
      };

      await transporter.sendMail(mailOptions);

      return {
        success: true,
        message: "Email sent successfully!",
        reset_token: reset_token,
      };
    }
  } catch (err) {
    console.log(err);
    if (err.code === "EAUTH") {
      console.log("ye vala error hai");
      return {
        success: false,
        error: "Failed to authenticate for email sending.",
      };
    } else if (err.code === "EENVELOPE") {
      return { success: false, error: "Invalid email address." };
    } else {
      return { success: false, error: "Failed to send email." };
    }
  }
};

// model for reset password

const setPassword = async (hashedPassword, token) => {
  const query =
    "UPDATE login_info SET password=?, reset_token=NULL, reset_token_expires=NULL WHERE reset_token=?";
  try {
    const result = await new Promise((resolve, reject) => {
      dbconnect.query(query, [hashedPassword, token], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
module.exports = {
  createUser,
  findUser,
  getUserData,
  updatePassword,
  sendEmail,
  setPassword,
};
