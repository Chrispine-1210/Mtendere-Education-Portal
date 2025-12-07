import express from 'express';
import path from 'node:path';
import session from 'express-session';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static frontend
app.use(express.static(path.join(__dirname, '../client/dist')));

// Basic API route
app.get('/api/ping', (_req, res) => {
    res.json({ message: 'pong' });
});

// Fallback to index.html for SPA
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

