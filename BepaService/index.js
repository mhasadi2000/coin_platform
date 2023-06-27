const axios = require("axios");

const { END_POINT } = require("./config");

const { PrismaClient } = require("@prisma/client");
const { BadRequestError } = require("./errors");
const { log } = require("console");
const prisma = new PrismaClient();

function executeCode(data) {
  console.log(data);

  const config = {
    method: "get",
    url: `${END_POINT}/api/data/${data}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  axios(config)
    .then(async function (response) {
      // console.log(JSON.stringify(response.data));

      var resultsupdate = await prisma.rates.update({
        data: {
          price: response.data.value,
          timestamp: response.data.updated_at,
        },
        where: {
          coin_name: data,
        },
      });
      console.log("updated" + data);

      var users = await prisma.users.findMany({
        where: {
          coin_name: data,
          difference_percentage: {
            gte: 9//Math.abs(response.data.roc),
          },
        },
      });

      console.log("users" + users);

      // for (u in users) {
      //send email
      // }
    })
    .catch(async function (error) {
      console.log(error);
    });
}

function start() {
  setInterval(async () => {
    const config = {
      method: "get",
      url: END_POINT + "/api/data",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    var coins = [];
    var rateTable=null;
    axios(config)
      .then(async function (response) {
        // console.log(JSON.stringify(response.data));
        coins = response.data;
        if (response.data.length == 0) {
          console.log(`nothing`);
          return;
        } else {
          await coins.forEach((row) => {
            // rateTable = prisma.rates.findFirst({ where: { coin_name: row } });
            // console.log("rateTable",rateTable.length);
            // if (rateTable.length == 0) {
            //   rateTable = prisma.rates.create({
            //     data: { coin_name: row },
            //   });
            //   console.log("coin name inserted");
            // // }
            console.log("start runner");
            executeCode(row);
            console.log("after runner");
          });
        }
      })
      .catch(async function (error) {
        console.log(error);
      });
  }, 10000);
}

start();
