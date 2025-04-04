const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

io.on("connection", (socket) => {
    console.log("🔵 مستخدم متصل:", socket.id);

    // استقبال الرسائل من العميل وإرسالها للجميع
    socket.on("sendMessage", (messageData) => {
        io.emit("receiveMessage", messageData);
    });

    // عند فصل المستخدم
    socket.on("disconnect", () => {
        console.log("🔴 مستخدم غادر:", socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 الخادم يعمل على http://localhost:${PORT}`));
