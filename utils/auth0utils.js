const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

// constant configerer
const configer = {
  method: "",
  maxBodyLength: Infinity,
  url: process.env.API_URI,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
};

// Get all users from Auth0
const getUsers = async () => {
  try {
    let config = {
      ...configer,
    };
    config.method = "get";
    config.url = `${config.url}/users`;
    const users = await axios
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
    return users;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// Create user in Auth0
const createUser = async (data) => {
  try {
    let config = {
      ...configer,
    };
    config.method = "post";
    config.url = `${config.url}/users`;
    config.data = data;
    config.data.connection = "Username-Password-Authentication";
    const user = await axios
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        // console.error(error);
        return error;
      });
    return user;
  } catch (error) {
    // console.error(error.message);
    return error;
  }
};

// Get a user from Auth0
const getAUser = async (id) => {
  try {
    console.log(id);
    let config = {
      ...configer,
    };
    config.method = "get";
    config.url = `${config.url}/users/${id}`;
    const user = await axios
      .request(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        // console.error(error);
        return error;
      });
    return user;
  } catch (error) {
    // console.error(error.message);
    return error;
  }
};

// change password
const changePassword = async (email) => {
  try {
    var options = {
      method: "POST",
      url: "https://dev-vk8f1oa2fnt1m70d.us.auth0.com/dbconnections/change_password",
      headers: { "content-type": "application/json" },
      data: {
        client_id: process.env.CLIENT_ID,
        email: email,
        connection: "Username-Password-Authentication",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    return;
  } catch (error) {
    console.error(error);
  }
};

const getToken = async () => {
  var options = {
    method: "POST",
    url: "https://dev-vk8f1oa2fnt1m70d.us.auth0.com/oauth/token",
    headers: { "content-type": "application/json" },
    body: '{"client_id":"9N2cUhjupkQISDeqiz42xyldFmma2WRh","client_secret":"eyjf5iNZ4_vXClED_jHccyawZ0gAkEmKoVskC-2VguDJL0wo4EGXWnuam7HYFD8p","audience":"https://dev-vk8f1oa2fnt1m70d.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
  };

  const token = axios
    .request(options)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });

  console.log(token);
  return token;
};

module.exports = {
  getUsers,
  createUser,
  getAUser,
  changePassword,
  getToken,
};
