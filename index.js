require('dotenv').config();
const { pool } = require('./helper/database/database');
const migration = require('./helper/database/migration');
const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes/routes');

try {
    migration(pool);
} catch (error) {
    console.error('Error migrating database:', error.stack);
}

app.use(express.json());
app.use("/docs", express.static(path.join(__dirname, 'docs')));
app.use("/assets", express.static(path.join(__dirname, 'assets')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

app.use('/api/v1', routes);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.APP_PORT}`);
});
