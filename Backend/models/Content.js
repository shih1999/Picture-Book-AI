const db = require('../config/db')

class Content {
    constructor(post_id,article,page_number,image_url,content,published){
        this.post_id = post_id;
        this.article = article;
        this.page_number = page_number;
        this.image_url = image_url;
        this.content = content;
        this.published = published;
    }
    async save() {

        let sql = `
        INSERT INTO contents (
            post_id,
            article,
            page_number,
            image_url,
            content,
            published
        ) 
        VALUES(
            '${this.post_id}',
            '${this.article}',
            '${this.page_number}',
            '${this.image_url}',
            '${this.content}',
            '${this.published}'
        )
        `;
        
        return db.execute(sql);
    }
    static findAll(){

    }
    static async updateContent(page_id, updateData) {

        const updateFields = Object.keys(updateData).map(field => `${field} = ?`).join(', ');
        const values = Object.values(updateData);
        
        let sql = `UPDATE contents SET ${updateFields} WHERE page_id = ?`;
        values.push(page_id);
    
        const [result] = await db.execute(sql, values);
        return result.affectedRows; 
    }
    
    // static findById(user_id) {
    //     let sql = `SELECT * FROM posts WHERE user_id = ?`;
    //     return db.execute(sql, [user_id]);
    // }
}

module.exports = Content;