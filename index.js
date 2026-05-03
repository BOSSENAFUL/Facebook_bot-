import login from "fca-project-orion";
import fs from "fs-extra";

const emojiData = fs.readJsonSync("./emojis.json");
const appState = fs.readJsonSync("./appstate.json");

login({ appState }, (err, api) => {
    if (err) return console.error("লগইন ফেইল! কুকি আপডেট করুন বস।");

    api.setOptions({ listenEvents: true, selfListen: false, forceLogin: true });
    console.log(`[ ONLINE ] Group React Bot is active.`);
    console.log(`[ CREDIT ] Developed by ENAFUL`);

    api.listenMqtt((err, event) => {
        if (err || !event) return;

        // চেক করা হচ্ছে মেসেজটি গ্রুপ থেকে এসেছে কি না
        if ((event.type === "message" || event.type === "message_reply") && event.isGroup === true) {
            
            // র‍্যান্ডম ইমোজি সিলেক্ট করা
            const emojis = emojiData.reactList;
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

            // শুধুমাত্র গ্রুপ মেসেজে রিঅ্যাক্ট দেওয়া
            api.setMessageReaction(randomEmoji, event.messageID, (err) => {
                if (err) console.log("রিঅ্যাক্ট দিতে সমস্যা হচ্ছে।");
            }, true);
        }
    });
});
