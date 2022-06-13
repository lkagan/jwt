import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

const posts = [
    { username: 'Larry', title: 'Post 1' },
    { username: 'John', title: 'Post 2' },
];

app.get("/posts", (req, res) => {
    res.json(posts);
});

app.post("/login", (req, res) => {
    // Authenticate user

    const username = req.body.username;
    const user = { name: username };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
})

app.listen(3000);