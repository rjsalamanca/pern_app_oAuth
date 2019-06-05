const db = require('./conn.js');

class restaurants {
    static async getAll(){
        const query = `SELECT * FROM restaurants`;
        try{
            const response = await db.result(query);
            return response;
        } catch(err){
            return err.message;
        }
    }
}

module.exports = restaurants;