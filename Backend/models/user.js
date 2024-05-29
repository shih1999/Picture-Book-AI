const db = require('../config/db')

class User {
    constructor(email_address,user_name,user_password){
        this.email_address = email_address;
        this.user_name = user_name;
        this.user_password = user_password;
    }
    async save(){

        // let d = new Date();
        // let yyyy = d.getFullYear();
        // let mm = d.getMonth() + 1;
        // let dd = d.getDate();
        // let createdAtDate = `${yyyy}-${mm}-${dd}`;

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
    static findAll(){

    }
    
    static findByName(user_name) {
        let sql = `SELECT * FROM users WHERE user_name = ?`;
        return db.execute(sql, [user_name]);
    }
}

module.exports = User;