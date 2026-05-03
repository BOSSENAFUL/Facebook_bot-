import login from "fca-project-orion";
import fs from "fs-extra";

// ডাটা ফাইলগুলো লোড করা হচ্ছে
const config = fs.readJsonSync("./config.json");
const emojiData = fs.readJsonSync("./emojis.json");
const appState = fs.readJsonSync("./appstate.json");

login({ appState }, (err, api) => {
    if (err) {
        console.error("লগইন ফেইল বস! আপনার কুকি (AppState) হয়তো এক্সপায়ার হয়েছে।");
        return;
    }

    // বটের সেটিংস
    api.setOptions({ 
        listenEvents: true, 
        selfListen: false, 
        forceLogin: true,
        online: true
    });

    console.log(`[ ONLINE ] Developed by ENAFUL - Group Only Mode`);

    api.listenMqtt((err, event) => {
        if (err || !event) return;

        // ইনবক্স (Private Message) হলে সরাসরি ইগনোর করবে
        if (!event.isGroup) return;

        // শুধু গ্রুপ মেসেজ বা মিডিয়া (ছবি/ভিডিও) আসলে রিঅ্যাক্ট দিবে
        if (event.type === "message" || event.type === "message_reply") {
            try {
                const randomEmoji = emojiData.reactList[Math.floor(Math.random() * emojiData.reactList.length)];
                
                api.setMessageReaction(randomEmoji, event.messageID, (err) => {
                    if (err) console.log("রিঅ্যাক্ট দিতে সমস্যা হচ্ছে, আইডি লিমিট হতে পারে।");
                }, true);
            } catch (e) {
                console.error("Error setting reaction:", e);
            }
        }
    });
});
