module.exports = {
  config: {
    name: "reply",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ENAFUL",
    description: "স্বয়ংক্রিয় টেক্সট রিপ্লাই সিস্টেম (৩০টি প্রিমিয়াম বক্স ডিজাইন রিপ্লাই)",
    commandCategory: "No Prefix",
    usages: "শুধু মেসেজ লিখলেই কাজ করবে",
    cooldowns: 2
  },

  handleEvent: async function ({ api, event }) {
    if (!event.body) return;
    
    const message = event.body.toLowerCase().trim();
    const threadID = event.threadID;
    const messageID = event.messageID;

    // চারদিকে দাগ বিশিষ্ট প্রিমিয়াম বক্স ডিজাইন ফাংশন
    function sendCyberReply(text) {
      const formattedMsg = 
        `╔══════════════════════════════════╗\n` +
        `║            𝗔𝗧𝗧𝗘𝗡𝗧𝗜𝗢𝗡            ║\n` +
        `╚══════════════════════════════════╝\n` +
        `  ${text}\n` +
        `╔══════════════════════════════════╗\n` +
        `║         🔱 𝗖𝗬𝗕𝗘𝗥 𝗘𝗡𝗔𝗙𝗨𝗟 🔱       ║\n` +
        `╚══════════════════════════════════╝`;
      api.sendMessage(formattedMsg, threadID, messageID);
    }

    // ১. সালাম
    if (message === "আসসালামু আলাইকুম" || message === "salam" || message === "slm" || message === "assalamualaikum") {
      return sendCyberReply("😇 ওয়ালাইকুম আসসালাম ওয়া রহমতুল্লাহ!\n\n  সবচেয়ে সুন্দর সম্ভাষণটি দেওয়ার জন্য ধন্যবাদ।\n  বলুন বস, আপনাকে কীভাবে সাহায্য করতে পারি?");
    }

    // ২. কেমন আছেন
    if (message === "কেমন আছেন" || message === "kemon achen" || message === "kemon acho") {
      return sendCyberReply("💖 আলহামদুলিল্লাহ বস!\n  আমি ও আমার ক্রিয়েটর ENAFUL দুজনেই খুব ভালো আছি।\n  আশা করি আপনিও আল্লাহর রহমতে দারুন আছেন!");
    }

    // ৩. বটের মালিক কে
    if (message === "مالک کے" || message === "owner ke" || message === "owner" || message === "বট এর মালিক কে" || message === "মালিক কে") {
      return sendCyberReply("🛡️ এই শক্তিশালী বটের সম্মানিত মালিক হলেন\n  কিংবদন্তি সাইবার এক্সপার্ট ENAFUL ভাই!\n  তার অনুমতি ছাড়া এই বট স্পর্শ করাও অসম্ভব।");
    }

    // ৪. হাই / হ্যালো
    if (message === "hi" || message === "hello" || message === "hey" || message === "হাই") {
      return sendCyberReply("👋 হ্যালো বস! আপনার মেসেজটি আমার ডাটাবেজে এসেছে।\n  ঝটপট বলে ফেলুন আজকে বসের পক্ষ থেকে\n  কী সেবা করতে পারি?");
    }

    // ৫. শুভ সকাল
    if (message === "শুভ সকাল" || message === "good morning" || message === "gm") {
      return sendCyberReply("☀️ শুভ সকাল বস! একটি সুন্দর ও সফল দিনের শুভেচ্ছা।\n  আজকের দিনটি আপনার অনেক আনন্দের কাটুক!");
    }

    // ৬. শুভ রাত্রি
    if (message === "শুভ রাত্রি" || message === "good night" || message === "gn") {
      return sendCyberReply("🌙 শুভ রাত্রি বস! সারাদিনের ক্লান্তি শেষে আপনার\n  ঘুমটি যেন প্রশান্তিময় হয়। মিষ্টি স্বপ্নের শুভেচ্ছা!");
    }

    // ७. কি করো
    if (message === "কি করো" || message === "ki koro" || message === "ki koros") {
      return sendCyberReply("🤖 এইতো বস, আপনার মতো অসাধারণ সব মানুষের\n  মেসেজের রিপ্লাই দেওয়ার জন্য ২৪ ঘণ্টা ডিউটি করছি।");
    }

    // ৮. ভালোবাসি
    if (message === "ভালোবাসি" || message === "love you" || message === "i love you" || message === "valobashi") {
      return sendCyberReply("🙈 ওহ বস! আপনি তো আমাকে পুরো লজ্জায় ফেলে দিলেন।\n  আমি তো রোবট, তবে আমার ক্রিয়েটর ENAFUL ভাইকে\n  আপনি ভালোবাসতে পারেন!");
    }

    // ৯. খেয়েছ?
    if (message === "খেয়েছ" || message === "kheyecho" || message === "ki khaile") {
      return sendCyberReply("🔌 আমি তো ভাত-মাছ খাই না বস! আমার প্রধান খাবার\n  হলো ইন্টারনেট ডেটা আর কারেন্ট। আমার পেট ফুল!");
    }

    // ১০. বাই / টাটা
    if (message === "bye" || message === "tata" || message === "বিদায়" || message === "আল্লাহ হাফেজ") {
      return sendCyberReply("👋 আল্লাহ হাফেজ বস! সাবধানে থাকবেন। আবার যেকোনো\n  প্রয়োজনে আমাকে ডাকবেন, আমি এখানেই আছি।");
    }

    // ১১. রোবট / বট
    if (message === "robot" || message === "bot" || message === "বট") {
      return sendCyberReply("🤖 জ্বে বস! আমি একটি আর্টিফিশিয়াল ইন্টেলিজেন্ট রোবট।\n  আমাকে ব্যাকগ্রাউন্ড থেকে নিয়ন্ত্রণ করছেন ENAFUL।");
    }

    // ১২. নাম কি
    if (message === "তোমার নাম কি" || message === "nam ki" || message === "name ki") {
      return sendCyberReply("🤖 আমার নাম হলো CYBERENAFUL BOT!\n  গ্রুপ ম্যানেজমেন্ট এবং অটোমেশনের জন্য আমি রেডি।");
    }

    // ১৩. ধন্যবাদ
    if (message === "ধন্যবাদ" || message === "thank you" || message === "thanks" || message === "tnx") {
      return sendCyberReply("🤗 আপনাকে অসংখ্য ধন্যবাদ আমার সাথে থাকার জন্য!\n  সাহায্য করতে পেরে আমি অত্যন্ত আনন্দিত।");
    }

    // ১৪. সাহায্য / help
    if (message === "help" || message === "সাহায্য" || message === "সাহায্য চাই") {
      return sendCyberReply("💡 কোনো চিন্তা করবেন না! বটের সব কমান্ড দেখতে\n  চাইলে চ্যাটে ঝটপট [/help] লিখে মেসেজ করুন।");
    }

    // ১৫. রাগ / রাগ করছি
    if (message === "রাগ" || message === "rag korchi" || message === "😡") {
      return sendCyberReply("🥺 আরে না বস, রাগ করবেন না প্লিজ! ভুল ত্রুটি\n  হলে ক্ষমা করবেন। আপনার মুখে হাসিই সুন্দর লাগে।");
    }

    // ১৬. হাসি / haha
    if (message === "haha" || message === "হাহাহা" || message === "😂" || message === "lol") {
      return sendCyberReply("🥳 আপনার মুখে এই সুন্দর হাসিটি দেখার জন্যই তো\n  আমার এই সিস্টেমে থাকা! সবসময় হাসিখুশি থাকুন।");
    }

    // ১৭. ফালতু / খারাপ
    if (message === "খারাপ" || message === "ফালতু" || message === "faltu" || message === "kharap") {
      return sendCyberReply("😔 দুঃখিত বস, যদি আমার কোনো আচরণ আপনার খারাপ\n  লেগে থাকে। আমি নিজেকে উন্নত করার চেষ্টা করছি।");
    }

    // ১৮. আবির / abir
    if (message === "abir" || message === "আবির" || message === "boss abir") {
      return sendCyberReply("👑 আরে! আপনি আমাদের Boss Abir ভাইয়ের কথা বলছেন?\n  তিনি এই প্রোজেক্টের অত্যন্ত সম্মানিত পার্টনার!");
    }

    // ১৯. জাস্ট জোক / মজা করলাম
    if (message === "মজা করলাম" || message === "joke" || message === "কৌতুক") {
      return sendCyberReply("🤪 হাহাহা দারুন তো বস! আপনার রসবোধ সত্যিই প্রশংসনীয়।\n  মাঝে মাঝে এমন হালকা মজা চ্যাটকে জমিয়ে তোলে।");
    }

    // ২০. ঘুমাবো
    if (message === "ঘুমাবো" || message === "ghumabo" || message === "sleep") {
      return sendCyberReply("💤 ঠিক আছে বস, অনেক রাত হলো, এবার মোবাইলটা\n  রেখে নিশ্চিন্তে ঘুমিয়ে পড়ুন। Take Rest!");
    }

    // ২১. আবহাওয়া / weather
    if (message === "weather" || message === "আবহাওয়া") {
      return sendCyberReply("☁️ আপনার এলাকার লাইভ আবহাওয়া জানতে চাইলে আমাদের\n  মেইন কমান্ড [/weather শহরের নাম] লিখে সার্চ করুন।");
    }

    // ২২. গান / music
    if (message === "গান" || message === "music" || message === "song") {
      return sendCyberReply("🎵 গান শুনতে ভালোবাসেন? আমাদের মিউজিক মডিউলটি\n  ট্রাই করতে পারেন। সার্চ করুন এবং উপভোগ করুন!");
    }

    // ২৩. আগুন / fire
    if (message === "fire" || message === "আগুন" || message === "🔥") {
      return sendCyberReply("🔥 ওহ! পুরো চ্যাট বক্সে আগুন লাগিয়ে দিলেন তো বস!\n  CYBER ENAFUL এর পাওয়ার এমনই চরম ও অনবদ্য!");
    }

    // ২৪. নাইস / nice
    if (message === "nice" || message === "নাইস" || message === "wow") {
      return sendCyberReply("✨ অসংখ্য ধন্যবাদ আপনার এই সুন্দর প্রশংসার জন্য বস!\n  আপনাদের সাপোর্টই আমাদের এগিয়ে যাওয়ার অনুপ্রেরণা।");
    }

    // ২৫. হ্যাকার / hacker
    if (message === "hacker" || message === "হ্যাকার" || message === "hacking") {
      return sendCyberReply("🛡️ সাইবার সিকিউরিটি এবং এথিক্যাল হ্যাকিংয়ের দুনিয়ায়\n  স্বাগতম! এই সিস্টেমটি সম্পূর্ণ ডেভেলপড।");
    }

    // ২৬. কে রে / তুই কে
    if (message === "তুই কে" || message === "tui ke" || message === "ke re") {
      return sendCyberReply("🤠 আমি এই চ্যাটের স্মার্ট অ্যাসিস্ট্যান্ট, বসের হয়ে\n  আমি আপনাকে সব ধরনের সাপোর্ট দিতে সর্বদা প্রস্তুত।");
    }

    // ২৭. ফানি / মজা
    if (message === "মজা" || message === "fun" || message === "moja") {
      return sendCyberReply("😜 বিনোদন চান বস? বটের বিনোদনমূলক মজার মজার\n  কমান্ডগুলো দেখতে গ্রুপে মেইন মেনু চেক করুন।");
    }

    // ২৮. ওয়েলকাম
    if (message === "welcome" || message === "ওয়েলকাম") {
      return sendCyberReply("🤝 ইউ আর অলওয়েজ ওয়েলকাম বস! একে অপরের পাশে\n  থাকাই তো আমাদের মূল লক্ষ্য ও সার্থকতা।");
    }

    // ২৯. বাড়ি কোথায়
    if (message === "বাড়ি কোথায়" || message === "bari kothay") {
      return sendCyberReply("🇧🇩 আমার বাড়ি মূলত ক্লাউড সার্ভারে, তবে আমার\n  মেকার ENAFUL ভাইয়ের বাড়ি চিরসবুজ বাংলাদেশে!");
    }

    // ৩০. ওরে বাবা
    if (message === "ওরে বাবা" || message === "ore baba" || message === "মাগো") {
      return sendCyberReply("😎 চমকে গেলেন তো বস? CYBER ENAFUL বটের স্পিড আর\n  কাস্টমাইজেশন দেখলে সবাই এভাবেই চমকে যায়!");
    }
  },

  run: async function ({ api, event }) {
    api.sendMessage("✨ CYBERENAFUL বক্স-ডিজাইন অটো-রিপ্লাই ইঞ্জিন সচল!\n\nকোনো প্রিফিক্স ছাড়া 'salam', 'owner', 'abir' বা 'hacker' লিখে টেস্ট করুন।", event.threadID, event.messageID);
  }
};
