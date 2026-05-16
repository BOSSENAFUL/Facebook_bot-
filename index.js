const { spawn } = require("child_process");
const axios = require("axios").default;
const logger = require("./utils/log");
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

let restartCount = 0;
const MAX_RESTARTS = 5;

// ==========================================
// 🛡️ CYBERENAFUL MESSENGER BOT SYSTEM 🛡️
// ==========================================

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  logger(`Server is running on port ${port}...`, "[ STARTING ]");
}).on("error", err => {
  logger(
    err.code === "EACCES"
      ? `Permission denied. Cannot bind to port ${port}.`
      : `Server error: ${err.message}`,
    "[ ERROR ]"
  );
});

function startBot(msg) {
  if (msg) logger(msg, "[ STARTING ]");

  // আপনার দেওয়া package.json অনুযায়ী Sahu.js রান করা হচ্ছে
  const bot = spawn(
    "node",
    ["--trace-warnings", "--async-stack-traces", "Sahu.js"],
    {
      cwd: __dirname,
      stdio: "inherit",
      shell: true
    }
  );

  bot.on("close", code => {
    logger(`Bot crashed with code ${code}.`, "[ CRASH ]");

    if (restartCount < MAX_RESTARTS) {
      restartCount++;
      logger(`Restarting... (${restartCount}/${MAX_RESTARTS})`, "[ RESTART ]");
      startBot();
    } else {
      logger(`Maximum restart limit reached (${MAX_RESTARTS}). Bot will NOT restart.`, "[ STOPPED ]");
    }
  });

  bot.on("error", err => {
    logger(`Process error: ${err}`, "[ ERROR ]");

    if (restartCount < MAX_RESTARTS) {
      restartCount++;
      logger(`Restarting... (${restartCount}/${MAX_RESTARTS})`, "[ RESTART ]");
      startBot();
    } else {
      logger(`Maximum restart limit reached (${MAX_RESTARTS}). Bot will NOT restart.`, "[ STOPPED ]");
    }
  });
}

// 🌐 Update Info Fetch & Branding
(async () => {
  try {
    // এখানে আগের ইউজারের GitHub লিংক রিমুভ করে আপনার CYBERENAFUL-BOT লিংক সেট করা হয়েছে
    const res = await axios.get(
      "https://raw.githubusercontent.com/ENAFUL/CYBERENAFUL-BOT/main/package.json",
      { timeout: 5000 }
    );
    logger(`Bot Name: ${res.data.name}`, "[ CYBERENAFUL ]");
    logger(`Version: ${res.data.version}`, "[ VERSION ]");
    logger(`Owner: ENAFUL`, "[ AUTHOR ]");
  } catch (err) {
    logger(`Update check failed: ${err.message}`, "[ UPDATE ERROR ]");
  }
})();

startBot("Initializing CYBERENAFUL Engine...");
