import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const posts = [
    { username: "Larry", title: "Post 1" },
    { username: "John", title: "Post 2" },
];

app.get("/posts", authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
});

app.listen(3000);

function authenticateToken(req, res, next) {
    const token = req.header("authorization")?.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ message: "Invalid token" });
    }
}
