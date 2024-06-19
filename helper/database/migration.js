const migration = (pool) => {
    pool.query('CREATE TABLE IF NOT EXISTS notes (id BIGINT AUTO_INCREMENT PRIMARY KEY, title TEXT NOT NULL, datetime DATETIME NOT NULL, note LONGTEXT NOT NULL)', (err, results) => {
        if (err) {
            console.error('Error creating table:', err.stack);
        } else {
            console.log('Migration Success.');
        }
    });
};

module.exports = migration;