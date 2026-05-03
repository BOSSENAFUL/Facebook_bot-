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

        // ইনবক্স (Private Message) হলে ইগনোর করবে
        if (!event.isGroup) return;

        // শুধু গ্রুপ মেসেজ বা মিডিয়াতে রিঅ্যাক্ট দিবে
        if (event.type === "message" || event.type === "message_reply") {
            try {
                const reactions = emojiData.reactList;
                if (reactions && reactions.length > 0) {
                    const randomEmoji = reactions[Math.floor(Math.random() * reactions.length)];
                    
                    api.setMessageReaction(randomEmoji, event.messageID, (err) => {
                        if (err) console.log("Reaction
