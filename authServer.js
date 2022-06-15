import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

// Normally kept in some shared key/value store like Redis
const refreshTokens = [];

app.post("/login", (req, res) => {
    // Authenticate user

    const user = { name: req.body.username };
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.json({ accessToken, refreshToken })
});

// Create a new access token
app.post('/token', (req, res) => {
    const refreshToken = req.body.token;

    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.sendStatus(401);
    }

    jwt.verify(req.body.token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        if (err) {
            return res.sendStatus(401);
        }

        const accessToken = generateAccessToken({ name: payload.name })
        return res.json(accessToken);
    });
});

const generateAccessToken = (user) => {
    // normally provide a longer expire time (eg: 10, 15, 30 minutes).
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

app.listen(4000);

