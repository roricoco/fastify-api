"use strict";

const axios = require("axios");

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    return "Welcome to Rococpy Fastify API 4.0!";
  });

  fastify.get("/rice", async function (request, reply) {
    reply.type("text/html; charset=utf-8");

    let returnHtml = "";

    await axios
      .get("https://www.hanyang.ac.kr/web/www/re11")
      .then(function (response) {
        // 성공 핸들링
        returnHtml +=
          response.data.split("<h3>")[1].split("</h3>")[0].trim() +
          `(\\${response.data.split(`class="price">`)[1].split("</p>")[0]})\n`;
        returnHtml +=
          "&nbsp;- " +
          response.data
            .split("<h3>")[2]
            .split("</h3>")[0]
            .split("[")[1]
            .split("]")[1]
            .trim()
            .split(", ")
            .join("\n&nbsp;- ");

        returnHtml += "\n\n";
      })

      .catch(function (error) {
        console.log(
          "Fail to get https://www.hanyang.ac.kr/web/www/re11 :" + error.code
        );

        returnHtml +=
          "오..이런.. 오류가 난거같아요 새로고침 해주세요! : " + error.code;

        returnHtml += "\n\n";
      });

    await axios
      .get("https://www.hanyang.ac.kr/web/www/re12")
      .then(function (response) {
        // 성공 핸들링
        returnHtml +=
          response.data.split("<h3>")[1].split("</h3>")[0].trim() +
          `(\\${
            response.data.split(`class="price">`)[1].split("</p>")[0]
          } | 택 1)\n`;

        returnHtml +=
          "&nbsp;- " +
          response.data
            .split("<h3>")[2]
            .split("</h3>")[0]
            .split("[")[1]
            .split("]")[1]
            .trim()
            .split(", ")
            .join("\n");

        returnHtml +=
          "\n&nbsp;- " +
          response.data
            .split("<h3>")[3]
            .split("</h3>")[0]
            .split("[")[1]
            .split("]")[1]
            .trim()
            .split(", ")
            .join("\n - ");

        returnHtml += "\n\n";
      })
      .catch(function (error) {
        console.log(
          "Fail to get https://www.hanyang.ac.kr/web/www/re12 :" + error.code
        );

        returnHtml +=
          "오..이런.. 오류가 난거같아요 새로고침 해주세요! : " + error.code;

        returnHtml += "\n\n";
      });

    await axios
      .get("https://www.hanyang.ac.kr/web/www/re15")
      .then(function (response) {
        returnHtml +=
          response.data.split("<h3>")[1].split("</h3>")[0].trim() +
          `(\\${response.data.split(`class="price">`)[1].split("</p>")[0]})\n`;
        returnHtml +=
          "&nbsp;- " +
          response.data
            .split("<h3>")[2]
            .split("</h3>")[0]
            .split("[")[1]
            .split("]")[1]
            .trim()
            .split(", ")
            .join("\n&nbsp;- ");

        returnHtml += "\n\n";
      })
      .catch(function (error) {
        console.log(
          "Fail to get https://www.hanyang.ac.kr/web/www/re15 :" + error.code
        );

        returnHtml +=
          "오..이런.. 오류가 난거같아요 새로고침 해주세요! : " + error.code;
        returnHtml += "\n\n";
      });

    return `<div>${String(returnHtml).split("\n").join("<br>")}</div>`;
  });
};
