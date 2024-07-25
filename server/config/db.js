const mysql2 = require('mysql2');


const db =  () => {
    try {
        const con = mysql2.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'r@@t',
            database: "blog"
        });
        return con;
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        throw error;
    }
};
module.exports = db;
