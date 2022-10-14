import { FastifyReply, FastifyRequest, fastify } from 'fastify';

import axios from 'axios';
import dotenv from 'dotenv';

import { cardType } from './card';

dotenv.config();

const PORT = Number(process.env.PORT || 4000);

const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:yyyy.mm.dd | TT hh:MM:ss',
        ignore: 'pid,hostname',
      },
    },
  },
});

app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
  return 'Welcome to Rococpy Fastify API!';
});

app.get('/rice', async (request: FastifyRequest, reply: FastifyReply) => {
  reply.type('text/html; charset=utf-8');

  let returnHtml = '';

  await axios
    .get('https://www.hanyang.ac.kr/web/www/re11')
    .then(function (response) {
      // 성공 핸들링
      returnHtml +=
        response.data.split('<h3>')[1].split('</h3>')[0].trim() +
        `(\\${response.data.split(`class="price">`)[1].split('</p>')[0]})\n`;
      returnHtml +=
        '&nbsp;- ' +
        response.data
          .split('<h3>')[2]
          .split('</h3>')[0]
          .split('[')[1]
          .split(']')[1]
          .trim()
          .split(', ')
          .join('\n&nbsp;- ');

      returnHtml += '\n\n';
    })

    .catch(function (error) {
      console.log(
        'Fail to get https://www.hanyang.ac.kr/web/www/re11 :' + error.code,
      );

      returnHtml +=
        error.code == undefined
          ? '오늘은 메뉴가 없는거 같아요! <a href="https://www.hanyang.ac.kr/web/www/re11" target="_blank">사이트</a>에서 확인해주세요!'
          : `오..이런.. 오류가 난거같아요 새로고침 해주세요!: ${error.code} `;
      returnHtml += '\n\n';
    });

  await axios
    .get('https://www.hanyang.ac.kr/web/www/re12')
    .then(function (response) {
      // 성공 핸들링
      returnHtml +=
        response.data.split('<h3>')[1].split('</h3>')[0].trim() +
        `(\\${
          response.data.split(`class="price">`)[1].split('</p>')[0]
        } | 택 1)\n`;

      returnHtml +=
        '&nbsp;- ' +
        response.data
          .split('<h3>')[2]
          .split('</h3>')[0]
          .split('[')[1]
          .split(']')[1]
          .trim()
          .split(', ')
          .join('\n');

      returnHtml +=
        '\n&nbsp;- ' +
        response.data
          .split('<h3>')[3]
          .split('</h3>')[0]
          .split('[')[1]
          .split(']')[1]
          .trim()
          .split(', ')
          .join('\n - ');

      returnHtml += '\n\n';
    })
    .catch(function (error) {
      console.log(
        'Fail to get https://www.hanyang.ac.kr/web/www/re12 :' + error.code,
      );

      returnHtml +=
        error.code == undefined
          ? '오늘은 메뉴가 없는거 같아요! <a href="https://www.hanyang.ac.kr/web/www/re12" target="_blank">사이트</a>에서 확인해주세요!'
          : `오..이런.. 오류가 난거같아요 새로고침 해주세요!: ${error.code} `;

      returnHtml += '\n\n';
    });

  await axios
    .get('https://www.hanyang.ac.kr/web/www/re15')
    .then(function (response) {
      returnHtml +=
        response.data.split('<h3>')[1].split('</h3>')[0].trim() +
        `(\\${response.data.split(`class="price">`)[1].split('</p>')[0]})\n`;
      returnHtml +=
        '&nbsp;- ' +
        response.data
          .split('<h3>')[2]
          .split('</h3>')[0]
          .split('[')[1]
          .split(']')[1]
          .trim()
          .split(', ')
          .join('\n&nbsp;- ');

      returnHtml += '\n\n';
    })
    .catch(function (error) {
      console.log(
        'Fail to get https://www.hanyang.ac.kr/web/www/re15 :' + error.code,
      );

      returnHtml +=
        error.code == undefined
          ? '오늘은 메뉴가 없는거 같아요! <a href="https://www.hanyang.ac.kr/web/www/re15" target="_blank">사이트</a>에서 확인해주세요!'
          : `오..이런.. 오류가 난거같아요 새로고침 해주세요!: ${error.code} `;
      returnHtml += '\n\n';
    });

  return `<div>${String(returnHtml).split('\n').join('<br>')}</div>`;
});

app.get('/cardtype', async (request: FastifyRequest, reply: FastifyReply) => {
  return cardType;
});

app.post('/cardtype/check', async (request: any, reply: FastifyReply) => {
  let returnData;
  cardType.map((x, i) => {
    const cardno = String(request?.body?.cardNo).replace('-', '').slice(0, 6);
    const Findno = x.cardNo.includes(cardno);

    if (Findno == true) {
      returnData = { cardNm: x.cardNm, cardNo: request?.body?.cardNo };
    }
  });

  if (!returnData) {
    reply.code(500);
    return { code: 500, message: 'Internal Server Error' };
  }
  return returnData;
});

(async () => {
  await app.listen({ host: '::', port: PORT });
})();
