const db = require('../config/db')

class Comment {
    constructor(post_id,user_id,text){
        this.post_id = post_id;
        this.user_id = user_id;
        this.text = text;
    }
    async save(){

        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = ('0' + (d.getMonth() + 1)).slice(-2); // 月份补零
        let dd = ('0' + d.getDate()).slice(-2); // 日期补零
        let hh = ('0' + d.getHours()).slice(-2);
        let min = ('0' + d.getMinutes()).slice(-2);
        let ss = ('0' + d.getSeconds()).slice(-2);
        let createdAtDate = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;

        let sql = `
        INSERT INTO comments (
            post_id,
            user_id,
            text,
            created_at
        ) 
        VALUES(
            '${this.post_id}',
            '${this.user_id}',
            '${this.text}',
            '${createdAtDate}'
        )
        `;

        return db.execute(sql);
    }
    static findAll(){

    }
    static async deleteByPostId(comment_id) {
        let sql = `DELETE FROM comments WHERE comment_id = ?`;
        const [result] = await db.execute(sql, [comment_id]);
        return result.affectedRows; 
    }
    static async updateComments(comment_id, text) {
        let sql = `UPDATE comments SET text = ? WHERE comment_id = ?`;
        const [result] = await db.execute(sql, [text,comment_id]);
        return result.affectedRows; 
    }
    static findByPost(post_id) {
        let sql = `SELECT * FROM comments WHERE post_id = ?`;
        return db.execute(sql, [post_id]);
    }
}

module.exports = Comment;