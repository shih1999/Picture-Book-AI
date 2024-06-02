const db = require('../config/db')

class Content {
    constructor(post_id,page_number,image_url,content,layout){
        this.post_id = post_id;
        this.page_number = page_number;
        this.image_url = image_url;
        this.content = content;
        this.layout = layout;
    }
    async save() {

        let sql = `
        INSERT INTO contents (
            post_id,
            page_number,
            image_url,
            content,
            layout
        ) 
        VALUES(
            '${this.post_id}',
            '${this.page_number}',
            '${this.image_url}',
            '${this.content}',
            '${this.layout}'
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

    static async findByPostId(post_id){
        let sql = `SELECT * FROM contents WHERE post_id = ?`;
        const [rows] = await db.execute(sql, [post_id]);
        return rows; 
    }
    static async findcover(post_id) {
        let sql = `
            SELECT * FROM contents 
            WHERE post_id = ? AND image_url IS NOT NULL AND image_url != 'undefined'
            ORDER BY page_number ASC 
            LIMIT 1
        `;
        const [rows] = await db.execute(sql, [post_id]);
        return rows[0];
    }
}

module.exports = Content;