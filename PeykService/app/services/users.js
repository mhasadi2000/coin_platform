const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const axios = require("axios");

const { END_POINT } = require("../services/config");

const {
  NotAvailableError,
  BadRequestError,
  ForbiddenError,
} = require("../errors");

/**
 *
 *
 * @param {*} jwt
 * @param {*} pgInstance
 * @param {*} data
 * @return {*}
 */
exports.login = async (data) => {
  // get user

  const { email_addr, coin_name, price_change } = data;

  var user = await prisma.users.create({
    data: {
      email: email_addr,
      coin_name: coin_name,
      difference_percentage: price_change,
    },
  });

  // return success
  return {
    data: {
      successful: user ? true : false,
    },
  };
};

exports.uploadFile = async (body) => {
  const { coin_name } = body;

  const config = {
    method: "get",
    url: `${END_POINT}/api/data/${coin_name}/history`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  let data = null;
  await axios(config)
    .then(async function (response) {
      console.log(JSON.stringify(response.data));
      data = response.data;
    })
    .catch(async function (error) {
      console.log(error);
      throw new BadRequestError("coudnt get response");
    });

  return { data: data };
};
