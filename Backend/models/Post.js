const db = require('../config/db')

class Post {
    constructor(user_id,title,story_category){
        this.user_id = user_id;
        this.title = title;
        this.story_category = story_category;
    }
    async save() {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = ('0' + (d.getMonth() + 1)).slice(-2); // 月份补零
        let dd = ('0' + d.getDate()).slice(-2); // 日期补零
        let hh = ('0' + d.getHours()).slice(-2);
        let min = ('0' + d.getMinutes()).slice(-2);
        let ss = ('0' + d.getSeconds()).slice(-2);
        let createdAtDate = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;

        let sql = `
        INSERT INTO posts (
            user_id,
            title,
            created_at,
            story_category
        ) 
        VALUES(
            '${this.user_id}',
            '${this.title}',
            '${createdAtDate}',
            '${this.story_category}'
        )
        `;
        
        return db.execute(sql);
    }
    static findAll(){

    }
    // static findById(user_id) {
    //     let sql = `SELECT * FROM posts WHERE user_id = ?`;
    //     return db.execute(sql, [user_id]);
    // }
}

module.exports = Post;