Const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

module.exports = function ({ api }) {
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
  const utils = require('./utils/index.js');

  const commandsPath = path.join(__dirname, 'modules', 'commands');
  const eventsPath = path.join(__dirname, 'modules', 'events');
  
  const commands = new Map();
  const events = new Map();

  // ১. commands/ ফোল্ডার থেকে সব কমান্ড ফাইল লোড করা
  if (fs.existsSync(commandsPath)) {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      try {
        const cmd = require(path.join(commandsPath, file));
        if (cmd.config && cmd.config.name) {
          commands.set(cmd.config.name, cmd);
        }
      } catch (error) {
        utils.log.error(`কমান্ড ফাইল ${file} লোড করতে সমস্যা হয়েছে: ${error.message}`);
      }
    }
  }

  // ২. events/ ফোল্ডার থেকে সব ইভেন্ট ফাইল (যেমন স্বাগত জানানোর ফাইল) লোড করা
  if (fs.existsSync(eventsPath)) {
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
      try {
        const evnt = require(path.join(eventsPath, file));
        if (evnt.config && evnt.config.name) {
          events.set(evnt.config.name, evnt);
        }
      } catch (error) {
        utils.log.error(`ইভেন্ট ফাইল ${file} লোড করতে সমস্যা হয়েছে: ${error.message}`);
      }
    }
  }

  // টার্মিনালে সুন্দর করে বসের ব্র্যান্ডিং সাকসেস মেসেজ দেখানো
  utils.log.cyber(`সফলভাবে ${commands.size}টি কমান্ড এবং ${events.size}টি ইভেন্ট লোড হয়েছে!`);
  utils.log.success(`${config.BOTNAME} এখন সম্পূর্ণ সচল এবং প্রস্তুত, বস ENAFUL!`);

  // ৩. মূল লিসেনার ফাংশন যা চ্যাটের মেসেজ ও ইভেন্ট হ্যান্ডেল করবে
  return function (err, event) {
    if (err) {
      utils.log.error(`লিসেনার সিস্টেমে ত্রুটি: ${JSON.stringify(err)}`);
      return;
    }

    // চ্যাটে আসা প্রতিটি টেক্সটের জন্য handleEvent রান করা (যেমন: এনাফুল, বট, বা কোনো ডট লিখলে)
    for (const [name, cmd] of commands.entries()) {
      if (typeof cmd.handleEvent === 'function') {
        try {
          cmd.handleEvent({ api, event, utils, config });
        } catch (e) {
          utils.log.error(`handleEvent ত্রুটি [${name}]: ${e.message}`);
        }
      }
    }

    // প্রিফিক্সসহ মেইন রান কমান্ডগুলো হ্যান্ডেল করা (যেমন: /kick, /uid)
    const prefix = config.PREFIX || "/";
    if (event.body && event.body.startsWith(prefix)) {
      const args = event.body.slice(prefix.length).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();
      
      if (commands.has(commandName)) {
        const cmd = commands.get(commandName);
        
        // অ্যাডমিন পারমিশন চেক করা (hasPermssion: 1 এর জন্য)
        if (cmd.config.hasPermssion === 1) {
          const isNumAdmin = config.ADMINBOT.includes(event.senderID);
          if (!isNumAdmin) {
            return api.sendMessage("⚠️ এই কমান্ডটি শুধুমাত্র বটের মেইন অ্যাডমিন বা গ্রুপ অ্যাডমিনরা ব্যবহার করতে পারবেন!", event.threadID, event.messageID);
          }
        }

        try {
          cmd.run({ api, event, args, utils, config });
        } catch (e) {
          api.sendMessage(`❌ কমান্ড রান করতে সমস্যা হয়েছে: ${e.message}`, event.threadID, event.messageID);
        }
      }
    }

    // গ্রুপে কেউ জয়েন করলে বা লিভ নিলে ইভেন্ট হ্যান্ডেল করা (যেমন: joinWelcome)
    for (const [name, evnt] of events.entries()) {
      if (typeof evnt.handleEvent === 'function') {
        try {
          evnt.handleEvent({ api, event, utils, config });
        } catch (e) {
          utils.log.error(`ইভেন্ট ত্রুটি [${name}]: ${e.message}`);
        }
      }
    }
  };
};
 কি নামে খুলবো    "node",
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
