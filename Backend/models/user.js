const db = require('../config/db')

class User {
    constructor(email_address,user_name,user_password){
        this.email_address = email_address;
        this.user_name = user_name;
        this.user_password = user_password;
    }
    async save(){

        let sql = `
        INSERT INTO users(
            email_address,
            user_name,
            user_password
        )
        VALUES(
            '${this.email_address}',
            '${this.user_name}',
            '${this.user_password}'
        )
        `;

        return db.execute(sql);
    }
    static async findById (user_id) {
        let sql = `SELECT * FROM users WHERE user_id = ?`;
        const [rows] = await db.execute(sql, [user_id]); 
        return rows.length > 0 ? rows[0] : null; 
    }
    
    static findByName(user_name) {
        let sql = `SELECT * FROM users WHERE user_name = ?`;
        return db.execute(sql, [user_name]);
    }
}

module.exports = User;