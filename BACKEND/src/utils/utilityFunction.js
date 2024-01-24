const crypto = require("crypto");
const generateResetToken = () => {
  try {
    const reset_token = crypto.randomBytes(32).toString("hex");
    return reset_token;
  } catch (error) {
    throw error;
    console.log(error);
  }
};
module.exports = { generateResetToken };
