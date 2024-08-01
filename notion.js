// import dotenv from "dotenv";
// dotenv.config();
require("dotenv").config();

const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_API_DATABASE;

// 0. 기초가 되는 데이터베이스 getDatabase_1는 여기서 query로 받아오고, 저장합니다.
module.exports = {
  getDatabase_1: async () => {
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
  },
};
