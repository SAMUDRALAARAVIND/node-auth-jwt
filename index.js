const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { postsRouter } = require("./routes/post");
const { authRouter } = require("./routes/auth");
const { userRouter } = require("./routes/user");

const app = express();

mongoose.connect("mongodb+srv://4byteinteger-root:aravind123@4byteinteger-mongo.fjsr0e4.mongodb.net/accio-users?retryWrites=true&w=majority&appName=4byteinteger-mongo")
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
});

app.use("/post", postsRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);