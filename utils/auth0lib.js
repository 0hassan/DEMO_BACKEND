const { ManagementClient } = require("auth0");
const { default: axios } = require("axios");
const dotenv = require("dotenv");
const { password } = require("../validations/customValidation");

dotenv.config();

// const management = new ManagementClient({
//   domain: "dev-vk8f1oa2fnt1m70d.us.auth0.com",
//   clientId: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
// });

const management = new ManagementClient({
  domain: process.env.API_DOMAIN,
  token: process.env.API_TOKEN,
});

// Get users from Auth0
const getUsers = async () => {
  try {
    const allUsers = [];
    let page = 0;
    while (true) {
      const {
        data: { users, total },
      } = await management.users.getAll({
        include_totals: true,
        page: page++,
      });
      allUsers.push(...users);
      if (allUsers.length === total) {
        break;
      }
    }
    return allUsers;
  } catch (error) {
    console.error(error);
  }
};

// Create user in Auth0
const createUser = async (data) => {
  try {
    data.password = generateRandomPassword();
    data.connection = "Username-Password-Authentication";
    const user = await management.users.create(data);
    return user;
  } catch (error) {
    console.error(error);
  }
};

// generate random password
function generateRandomPassword() {
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()-_+=<>?";

  // Function to get a random character from a given string
  function getRandomCharacter(str) {
    return str[Math.floor(Math.random() * str.length)];
  }

  let password = "";
  password += getRandomCharacter(uppercaseLetters); // At least one uppercase letter
  password += getRandomCharacter(numbers); // At least one number
  password += getRandomCharacter(specialChars); // At least one special character

  for (let i = 0; i < 5; i++) {
    // Generate remaining 5 characters randomly
    const allCharacters =
      uppercaseLetters + lowercaseLetters + numbers + specialChars;
    password += getRandomCharacter(allCharacters);
  }

  // Shuffle the password characters
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
}

// Get a user from Auth0
const getAUser = async (id) => {
  try {
    const user = await management.users.get({ id });
    return user;
  } catch (error) {
    console.error(error);
  }
};

// Delete a user from Auth0
const deleteUser = async (id) => {
  try {
    return await management.users.delete({ id });
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = {
  getUsers,
  createUser,
  getAUser,
  deleteUser,
};
