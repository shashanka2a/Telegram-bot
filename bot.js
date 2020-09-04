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

/*Puppeteer equivalent Code for SVECW*/

const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1440,
    height: 900,
  });
  const navigationPromise = page.waitForNavigation({
    waitUntil: "domcontentloaded",
  });
  await page.goto("http://svecwecap.in/");
  await page.click("#txtId2");
  await page.keyboard.type("18b01a0452");
  await page.click("#txtPwd2");
  await page.keyboard.type("webcap");
  await page.click("#imgBtn2");
  await navigationPromise;
  await page.waitFor(2000);
  await page.goto(
    "http://svecwecap.in/Academics/StudentAttendance.aspx?showtype=SA"
  );
  await page.waitFor(5000);
  await page.waitForSelector("#radTillNow");
  await page.click("#radTillNow");
  await page.waitForSelector("#btnShow");
  await page.click("#btnShow");
  await page.waitFor(5000);
  await page.screenshot({ path: "ecap3.png", fullPage: true });
  await browser.close();
})();

