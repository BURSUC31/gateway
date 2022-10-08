require("dotenv").config();
const convict = require("convict");

const config = convict({
  APP: {
    port: {
      format: Number,
      default: 3001,
      arg: "DEV_APP_PORT",
      env: "DEV_APP_PORT",
    },
  },
  DB: {
    host: {
      format: String,
      default:
        "mongodb://localhost:27017/USERS?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
      arg: "DEV_DB_HOST",
      env: "DEV_DB_HOST",
    },
  },

  MAX_NUMBER_OF_TRIES: {
    format: Number,
    default: 5,
    arg: "maximum number of requests per user",
    env: "MAX_NUMBER_OF_TRIES",
  },
  banTime: {
    format: Number,
    default: 5000,
    arg: "time (MS) spent after user reaches maxium number of requests",
    env: "BAN_TIME",
  },
  REDIRECT_URL: {
    format: String,
    default:
      "https://api.openweathermap.org/data/2.5/onecall?lat=46&lon=24&appid=6d1e142d613e4ec502ed5838528f683e&units=metric&lang=ro",
    arg: "URL forwarded by gateway",
    env: "REDIRECT_URL",
  },
});

module.exports = config;
