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
        let mm = ('0' + (d.getMonth() + 1)).slice(-2); 
        let dd = ('0' + d.getDate()).slice(-2);
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
        
        const [result] = await db.execute(sql);
        const post_id = result.insertId;
        return post_id;
    }

    static async findByPostId(post_id) {
        let sql = `SELECT * FROM posts WHERE post_id = ? `;
        const [rows] = await db.execute(sql, [post_id]);
        return rows; 
    }

    static async updatePost(post_id, updateData) {

        const updateFields = Object.keys(updateData).map(field => `${field} = ?`).join(', ');
        const values = Object.values(updateData);
        
        let sql = `UPDATE posts SET ${updateFields} WHERE post_id = ?`;
        values.push(post_id);
    
        const [result] = await db.execute(sql, values);
        return result.affectedRows; 
    }

    static async findByUserId(user_id, p){
        let sql = `SELECT * FROM posts WHERE user_id = ? AND published = ?`;
        const [rows] = await db.execute(sql, [user_id,p]);
        return rows; 
    }

    static async updateLikesCount(post_id, likes_count) {
        let sql = `UPDATE posts SET likes_count = ? WHERE post_id = ?`;
        const [result] = await db.execute(sql, [likes_count, post_id]);
        return result.affectedRows; 
    }

    static async updateCommentsCount(post_id, comments_count) {
        let sql = `UPDATE posts SET comments_count = ? WHERE post_id = ?`;
        const [result] = await db.execute(sql, [comments_count, post_id]);
        return result.affectedRows; 
    }

    static async findAllSorted(sortway,descorasc) {
        const sql = `SELECT * FROM posts ORDER BY ${sortway} ${descorasc}`;
        const [rows] = await db.execute(sql);
        return rows;
    }
    static async findcategory(sortedBy) {
        
        let sql = `SELECT * FROM posts WHERE story_category = ?`;
        const [rows] = await db.execute(sql,[sortedBy]);
        return rows;
    }
    static async findcategoryandway(sortedBy,sortway,descorasc) {
        
        let sql = `SELECT * FROM posts WHERE story_category = ? ORDER BY ${sortway} ${descorasc}`;
        const [rows] = await db.execute(sql,[sortedBy]);
        return rows;
    }
    static async getByPostId(post_id) {
        let sql = `SELECT * FROM posts WHERE post_id = ?`;
        const [result] = await db.execute(sql, [post_id]);
        return result; 
    }

    static async deleteByPostId(post_id) {
        let sql = `DELETE FROM posts WHERE post_id = ?`;
        const [result] = await db.execute(sql, [post_id]);
        return result.affectedRows; 
    }
    static async updatePublish(post_id) {
        let sql = `
        UPDATE posts 
        SET published = CASE 
            WHEN published = 0 THEN 1
            ELSE 0
        END 
        WHERE post_id = ?`;
    
        const values = [post_id];
        const [result] = await db.execute(sql, values);
        return result.affectedRows; 
    }
    
}

module.exports = Post;