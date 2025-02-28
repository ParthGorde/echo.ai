import express from "express";
import cors from "cors";
import ImageKit from "imagekit";
import mongoose from "mongoose";
import Chat from "./models/chat.js";
import UserChats from "./models/userChats.js";
import { getAuth, requireAuth } from "@clerk/express";

const port = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

app.get("/api/upload", (req, res) => {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

// app.get("/api/test", requireAuth(), (req,res)=>{
//         const { userId } = getAuth(req)
//         console.log("Successfully auth " + userId);

// })

app.post("/api/chats", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const { text } = req.body;
  try {
    // CREATE A NEW CHAT
    const newChat = new Chat({
      userId: userId,
      history: [
        {
          role: "user",
          parts: [{ text }],
        },
      ],
    });
    const savedChat = await newChat.save();

    // CHECK IF USER CHATS EXISTS
    const userChats = await UserChats.find({ userId: userId });

    if (!userChats.length) {
      // IF NOT, CREATE A NEW ONE AND ADD THE CHAT
      const newUserChats = new UserChats({
        userId: userId,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 40),
          },
        ],
      });

      await newUserChats.save();
    } else {
      // IF EXISTS, PUSH THE CHAT TO THE EXISTING ARRAY
      await UserChats.updateOne(
        { userId: userId },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );
    }

    res.status(201).send(savedChat._id);
  } catch (error) {
    console.error("Error Creating Chat:", error);
    res.status(500).send("Error Creating Chat: " + error.message);
  }
});

app.get("/api/userchats", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);

  try {
    const userChats = await UserChats.find({ userId: userId });
    if (!userChats.length) {
      return res.status(200).send([]); // Return empty array if no chats exist
    }
    res.status(200).send(userChats[0].chats);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error Fetching userchats..!" + err.message);
  }
});

app.get("/api/chats/:id", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);

  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId });
    res.status(200).send(chat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error Fetching Chat:");
  }
});

app.put("/api/chats/:id", requireAuth(), async (req, res) => {
  const {userId} = getAuth(req);
  console.log(userId);
  
  const { question, answer, img } = req.body;

  const newItems = [
    ...(question
      ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
      : []),
    { role: "model", parts: [{ text: answer }] },
  ];

  //  //
  //   const newItems = [
  //     ...(question
  //       ? { role: "user", parts: [{ text: question }], ...(img && { img }) }
  //       : []),
  //     { role: "model", parts: [{ text: answer }] },
  //   ];
  // //
  try {
    

    const updatedChat = await Chat.updateOne(
      { _id: req.params.id, userId },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      }
    );

    res.status(200).send(updatedChat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding Conversation " + err.message);
  }
});

app.get("/api/chats/:chatId", (req, res) => {
  res.json({ message: `Chat ID is ${req.params.chatId}` });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated");
});

app.listen(port, () => {
  connect();
  console.log(`Server running on port ${port}`);
});
