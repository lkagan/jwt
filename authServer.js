import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/login", (req, res) => {
    // Authenticate user

    const user = { name: req.body.username };
    res.json({ accessToken: jwt.sign(user, process.env.ACCESS_TOKEN_SECRET) });
});

app.listen(4000);

