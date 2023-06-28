const userController = require("../controllers/users");
const multer = require("fastify-multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });


const {
  userpassSchema,
  OKResponse,
} = require("../schemas/users");

const loginOpts = (fastify) => {
  return {
    handler: userController.loginReq(fastify),
  };
};

const uploadFileOpts = (fastify) => {
  return {
    handler: userController.uploadFileReq(fastify),
  };
};

function userRoutes(fastify, options, done) {
  // login
  fastify.post("/subscribe", loginOpts(fastify));

  //upload file
  fastify.post("/price", uploadFileOpts(fastify));

  done();
}

module.exports = userRoutes;
