const fs = require("fs-extra");
const login = require("sahu-fca");
const chalk = require("chalk");
const logger = require("./utils/log");

// config.json ফাইল থেকে আপনার তথ্য লোড করা হচ্ছে
let config;
try {
  config = fs.readJsonSync("./config.json");
} catch (err) {
  logger("config.json ফাইলটি পাওয়া যায়নি বা ফাইলে ভুল আছে!", "[ ERROR ]");
  process.exit(1);
}

// appstate (cookies) লোড করার ফাংশন
let appState;
try {
  appState = fs.readJsonSync(config.APPSTATEPATH || "cokiState.json");
} catch (err) {
  logger("Appstate বা কুকি ফাইলটি পাওয়া যায়নি! দয়া করে সঠিক কুকি ফাইল দিন।", "[ ERROR ]");
  process.exit(1);
}

// =========================================================
// 🔥 CYBERENAFUL SYSTEM INITIALIZATION 🔥
// =========================================================
logger("Initializing CYBERENAFUL Engine...", "[ STARTING ]");
logger("Connecting to Facebook Servers...", "[ LOGIN ]");

// Facebook এ লগইন প্রসেস
login({ appState: appState }, (err, api) => {
  if (err) {
    logger(`লগইন ব্যর্থ হয়েছে: ${JSON.stringify(err)}`, "[ ERROR ]");
    process.exit(1);
  }

  // FCA অপশন সেট করা (আপনার config.json অনুযায়ী)
  api.setOptions({
    listenEvents: config.FCAOption.listenEvents ?? true,
    selfListen: config.FCAOption.selfListen ?? false,
    forceLogin: config.FCAOption.forceLogin ?? true,
    logLevel: config.FCAOption.logLevel ?? "error"
  });

  console.log(chalk.bold.cyan("\n=================================================="));
  console.log(chalk.bold.green("        🎉 CYBERENAFUL BOT IS NOW ACTIVE! 🎉      "));
  console.log(chalk.bold.cyan("==================================================\n"));
  
  logger(`বটের নাম: ${config.BOTNAME}`, "[ INFO ]");
  logger(`ডেভেলপার: ENAFUL`, "[ AUTHOR ]");
  logger(`ডিফল্ট প্রিফিক্স: ${config.PREFIX}`, "[ INFO ]");

  // মেসেজ এবং ইভেন্ট শোনার লিসেনার (Listener)
  api.listenMqtt((err, event) => {
    if (err) {
      logger(`লিসেনারে সমস্যা হয়েছে: ${err}`, "[ ERROR ]");
      return;
    }

    // শুধুমাত্র ইনকামিং মেসেজ হ্যান্ডেল করার জন্য
    if (event.type === "message") {
      const messageBody = event.body ? event.body.trim() : "";
      
      // কেউ "hi" বা "hello" দিলে বট রেসপন্স করবে (টেস্ট করার জন্য)
      if (messageBody.toLowerCase() === "hi" || messageBody.toLowerCase() === "hello") {
        api.sendMessage(`হ্যালো! আমি ${config.BOTNAME}। আপনাকে কীভাবে সাহায্য করতে পারি?`, event.threadID, event.messageID);
      }

      // প্রিফিক্স চেক করা (যেমন: /help, /info)
      if (messageBody.startsWith(config.PREFIX)) {
        const args = messageBody.slice(config.PREFIX.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        // ১. হেল্প কমান্ড (/help)
        if (command === "help") {
          api.sendMessage(`🤖 ${config.BOTNAME} কমান্ড লিস্ট:\n\n1. ${config.PREFIX}help - বটের সব কমান্ড দেখতে।\n2. ${config.PREFIX}info - বটের মালিকের তথ্য জানতে।`, event.threadID, event.messageID);
        }
        
        // ২. ইনফো কমান্ড (/info)
        else if (command === "info") {
          const infoMessage = `🛡️ বটের মালিকের তথ্য 🛡️\n\n` +
                              `👤 নাম: ENAFUL\n` +
                              `ধর্ম: ${config.AuthorReligion}\n` +
                              `🌐 গিঠাব: ${config.AuthorGithub}\n` +
                              `📢 ডেভেলপড বাই: CYBERENAFUL`;
          
          // আপনার দেওয়া ইমেজ লিংকটি মেসেজে পাঠানো হবে
          api.sendMessage({
            body: infoMessage,
            url: config.AuthorPhoto
          }, event.threadID, event.messageID);
        }
        
        // ভুল কমান্ড দিলে
        else {
          api.sendMessage(`❌ দুঃখিত, "${command}" নামে কোনো কমান্ড পাওয়া যায়নি। সাহায্য পেতে ${config.PREFIX}help লিখুন।`, event.threadID, event.messageID);
        }
      }
    }
  });
});
