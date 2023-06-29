const mailgun = require("mailgun-js");
const DOMAIN =
  "sandbox0915fa6b8b9b4db99e4be5b8c3fbc6e5.mailgun.org";
const APIKEY = "8908bb78e093db1bc9db0f07e3416593-e5475b88-6adda65b";
const mailgunConfig = mailgun({ apiKey: APIKEY, domain: DOMAIN });
module.exports = mailgunConfig;
