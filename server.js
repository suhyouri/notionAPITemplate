const { Client } = require("@notionhq/client");
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();
let dotenv = require("dotenv");
dotenv.config();

// require("dotenv").config();

const { getDatabase_1 } = require('./notion');
const cors = require("cors");

//socket.io
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server, {
//   cors: {
//     origin: ["https://admin.socket.io"],
//     credentials: true,
//   },
// });

//database 
const databaseId = process.env.NOTION_API_DATABASE;
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3000;
const notion = new Client({ auth: process.env.NOTION_API_KEY });
app.use(cors());

app.use(express.static('public'));

//socket ver
server.listen(PORT, HOST, () => {
  console.log("Starting proxy at " + HOST + ":" + PORT);
});

// ---> 1. Query a database (res)
// getDatabase_1의 데이터 베이스를 express.app/leftpage에 띄울게요.
// leftanswers에 getDatabase_1 데이터 베이스를 저장합니다.  
// 그리고 응답받은 값(res)을 json()형식으로 저장합니다. 
app.get('/leftpage', async (req, res) => {
  const leftanswers = await getDatabase_1();
  res.json(leftanswers);
});

// ---> 4. Create a page (req) 데이터 넣어달라고 요청하기 파트
// /submitFormToNotion_left 띄운 값 가져와서 띄우는 거임 
// Record the input value 
app.post("/submitFormToNotion_left", jsonParser, async (req, res) => {
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
      console.log("Success!_leftInput");
    } catch (err) {
      console.log("Something Wrong!");
      console.log(err);
    }
});

