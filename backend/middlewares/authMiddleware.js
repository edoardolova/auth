const connection = require('../db/db.js');

function authMiddleware(req, res, next){

    const authHeader = req.get("Authorization");

    if (!authHeader) {
        return res.status(401).json({
            error: true,
            mess: "token mancante"
        });
    }

    const token = authHeader;

    const checkSessionSql = `
        SELECT *
        FROM sessions
        WHERE token = ?
        AND is_valid = 1
        AND expires_at > NOW()
    `;

    connection.query(checkSessionSql, [token], (err, result)=>{

        if (err) {
            return res.status(500).json({
                error: true,
                mess: err.message
            });
        }

        if (result.length === 0) {
            return res.status(401).json({
                error: true,
                mess: 'nessuna sessione valida'
            });
        }

        req.session = result[0];

        next();

    });

}

module.exports = authMiddleware;
