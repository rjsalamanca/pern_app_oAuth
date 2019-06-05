const db = require('./conn.js');

class users {
    static async getAll(){
        const query = `SELECT * FROM users`;
        try{
            const response = await db.result(query);
            return response;
        } catch(err){
            return err.message;
        }
    }
}

module.exports = users;