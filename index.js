import login from "fca-project-orion";
import fs from "fs-extra";

const config = fs.readJsonSync("./config.json");
const emojiData = fs.readJsonSync("./emojis.json");
const appState = fs.readJsonSync("./appstate.json");

login({ appState }, (err, api) => {
    if (err) return console.error("লগইন ফেইল বস! নতুন কুকি দিন।");

    api.setOptions({ listenEvents: true, selfListen: false, forceLogin: true });
    console.log(`[ ONLINE ] Developed by ENAFUL - Group React Mode`);

    api.listenMqtt((err, event) => {
        if (err || !event) return;

        // ইনবক্স মেসেজ হলে সরাসরি ইগনোর করবে
        if (!event.isGroup) return;

        // শুধু গ্রুপ মেসেজ বা মিডিয়া হলে রিঅ্যাক্ট দিবে
        if (event.type === "message" || event.type === "message_reply") {
            const randomEmoji = emojiData.reactList[Math.floor(Math.random() * emojiData.reactList.length)];
            
            api.setMessageReaction(randomEmoji, event.messageID, (err) => {
                if (err) console.log("রিঅ্যাক্ট লিমিট হতে পারে বস।");
            }, true);
        }
    });
});
