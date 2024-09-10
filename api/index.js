require('dotenv').config(); //dotenv 사용하여 환경변수 업로드
const { Client } = require('@notionhq/client'); //NOTION API와 통신
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json(); //본문을 json 형식으로 처리할 수 있도록 설정
const cors = require('cors'); //

//express - server setup
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

//database ** 수정할 곳 **
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
}); //notion Integration key
const databaseId = process.env.NOTION_API_DATABASE; //database Id
const HOST = process.env.HOST; // local IP
const portNum = process.env.PORT; // PORT Number

app.use(cors());

app.use(express.static('public'));

//express server
server.listen(portNum, HOST, () => {
  console.log('Starting proxy at ' + HOST + ':' + portNum);
});

// 0. Notion에서 만든 데이터베이스 getDatabase는 여기서 query로 받아오고, 저장합니다.
const getDatabase = async () => {
  const response = await notion.databases.query({ database_id: databaseId });
  return response.results.map((page) => {
    // console.log(page);
    console.log(page.properties.Nickname.title[0]?.plain_text);
    return {
      nickname: page.properties.Nickname.title[0]?.plain_text,
      answer: page.properties.Answer.rich_text[0]?.plain_text,
      timestamp: page.properties.Date.rich_text[0]?.plain_text,
    };
  });
};

// ---> 1. Query a database (res)
// getDatabase_1의 데이터 베이스를 express.app/leftpage에 띄울게요.
// leftanswers에 getDatabase 데이터 베이스를 저장합니다.
// 그리고 응답받은 값(res)을 json()형식으로 저장합니다.
app.get('/page', async (req, res) => {
  const answers = await getDatabase();
  res.json(answers);
});

// ---> 4. Create a page (req) 데이터 제출 요청하기
// /submitFormToNotion 에 있는 값 가져와서 띄우는 거임
// Record the input value
app.post('/submitFormToNotion', jsonParser, async (req, res) => {
  // console.log(req);
  const nickname = req.body.Nickname;
  const answer = req.body.Answer;
  const timestamp = req.body.Date;

  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Nickname: {
          title: [
            {
              text: {
                content: nickname,
              },
            },
          ],
        },
        Answer: {
          rich_text: [
            {
              text: {
                content: answer,
              },
            },
          ],
        },
        Date: {
          rich_text: [
            {
              text: {
                content: timestamp,
              },
            },
          ],
        },
      },
    });
    // console.log(response);
    console.log('Success!_Input Added to DB');
  } catch (err) {
    console.log('Something Wrong!');
    console.log(err);
  }
});
