const connection = require("../db/db.js");

function profileController(req, res){
    const userId = req.session.user_id;

    const sql = `
        SELECT id, username,name, surname, email,  birth_year, role
        FROM users
        WHERE id = ?
    `;

    connection.query(sql, [userId], (err, result)=>{
        if(err){
            return res.status(500).json({ 
                error: true, 
                mess: err.message 
            });
        }

        if(result.length === 0){
            return res.status(404).json({ 
                error: true, 
                mess: 'utente non trovato' 
            });
        }

        res.status(200).json(result[0]);
    });
}

module.exports = profileController;
