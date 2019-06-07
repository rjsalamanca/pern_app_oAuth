const db = require('./conn.js');

class Restaurants {
    constructor(id,address,street,city,state,menu){
        this.id = id;
        this.address = address;
        this.street = street;
        this.city = city;
        this.state = state;
        this.menu = menu;
    }


    static async getAll(){
        const query = `SELECT * FROM restaurants`;
        try{
            const response = await db.result(query);
            return response;
        } catch(err){
            return err.message;
        }
    }

    async getOneRestaurant(){
        try{
            const response = await db.one(`SELECT * FROM restaurants WHERE id = $1`,[this.id]);
            return response;
        } catch(err){
            return err.message;
        }
    }

    async getOneRestaurantReviews(){
        try{
            const response = await db.any(`
                SELECT REST.id, REST.name, REV.context, REV.score,  U.first_name
                FROM restaurants AS REST, reviews AS REV,  users AS U
                WHERE REV.restaurant_id = $1 AND REST.id = $1 AND REV.userid = U.id ORDER BY REST.id`, [this.id]);
            return response;
        } catch(err){
            return err.message;
        }
    }

    async addReview(score,review,userID){
        try{
            const response = await db.any(
                `INSERT INTO reviews (score, context, restaurant_id, userid) 
                VALUES ($1,$2,$3,$4)`,[score,review,this.id,userID]
            );
            return response;
        } catch(err){
            return err.message;
        }
    }
}

async function getQuery(query){
    try{
        const response = await db.result(query);
        return response;
    } catch(err){
        return err.message;
    }
}

module.exports = Restaurants;