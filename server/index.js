const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routers");

const PORT = process.env.PORT || 5000; //нужно менять на 3000, хотя в прокси прописано

const app = express();

app.use(express.json({extended: true}));
app.use("/api/auth", authRouter);

const start = async () => {
    try {
        await mongoose.connect("mongodb+srv://songbird:songbird2022@cluster0.rcaii.mongodb.net/songbird?retryWrites=true&w=majority", /*{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true,
            useFindAndModify: true
        }*/)
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}
start();