const userService = require("../services/users");


exports.loginReq = (fastify) => {
  return (req, reply) => {
    return userService.login(req.body);
  };
};


exports.uploadFileReq = (fastify) => {
  return (req, reply) => {
    return userService.uploadFile(req.body);
  };
};