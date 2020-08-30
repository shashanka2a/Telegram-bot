const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const token = "1366924655:AAG40FyYTvMrfb_u6etc2HuEL1SJDc_JdUQ";
const bot = new TelegramBot(token, { polling: true });

const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true });

//const username = "17211a05a5";
const password = "webcap";

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  console.log(msg.chat.first_name);
  const username = msg.text;
  function f(username, i) {
    nightmare
      .viewport(1440, 900)
      .goto("https://bvrit.edu.in/")
      .wait(2000)
      .type("#txtId2", username)
      .type("#txtPwd2", password)
      .click("#imgBtn2")
      .wait(15000)
      .screenshot("ecap.png")
      .end()
      .then(console.log)
      .catch((error) => {
        console.error("Search failed:", error);
      });
    setTimeout(i, 45000);
  }
  function i() {
    fs.readFile("ecap.png", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        bot.sendPhoto(chatId, data);
      }
    });
  }
  //passing i as a callback function to f.
  f(username, i);
});


