const connection = require("../db/db.js")
const bcrypt = require('bcrypt');
const crypto = require('crypto')

async function signUp(req, res) {
    console.log(req.body)

    const {
        username,
        email,
        password,
        name,
        surname,
        birth_year
    } = req.body;

    // validazione base
    if (!username || !email || !password || !name || !surname) {
        return res.status(400).json({
            error: true,
            mess: 'username, email, password, nome e cognome obbligatori'
        });
    }

    const checkUserSql = `
        SELECT id
        FROM users
        WHERE username = ?
        OR email = ?
    `;

    connection.query(checkUserSql, [username, email], async (err, result) => {

        if (err) {
            return res.status(500).json({
                error: true,
                mess: err.message
            });
        }

        if (result.length !== 0) {
            return res.status(400).json({
                error: true,
                mess: 'username o email già esistenti'
            });
        }

        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const insertSql = `
                INSERT INTO users (
                    username,
                    email,
                    password_hash,
                    name,
                    surname,
                    birth_year,
                    role
                )
                VALUES (?, ?, ?, ?, ?, ?, 'user')
            `;

            connection.query(
                insertSql,
                [
                    username,
                    email,
                    hashedPassword,
                    name,
                    surname,
                    birth_year || null
                ],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            error: true,
                            mess: err.message
                        });
                    }
                    return res.status(201).json({
                        message: "Utente registrato con successo",
                        user_id: result.insertId
                    });

                }
            );

        }
        catch (error) {
            return res.status(500).json({
                error: true,
                mess: error.message
            });
        }
    });
}




function login(req, res){

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            error: true,
            mess: 'username e password obbligatori'
        });
    }

    const checkUsernameSql = `
        SELECT id, password_hash, role, is_active
        FROM users
        WHERE username = ?
    `;

    connection.query(checkUsernameSql, [username], async (err, result)=>{

        if (err) {
            return res.status(500).json({ error: true, mess: err.message });
        }

        if (result.length === 0) {
            return res.status(400).json({
                error: true,
                mess: 'username non trovato'
            });
        }

        const user = result[0];

        const pswMatch = await bcrypt.compare(password, user.password_hash);

        if (!pswMatch) {
            return res.status(400).json({
                error: true,
                mess: 'password errata'
            });
        }

        // check existing session
        const checkSessionSql = `
            SELECT token, expires_at
            FROM sessions
            WHERE user_id = ?
            AND is_valid = 1
            AND expires_at > NOW()
            LIMIT 1
        `;

        connection.query(checkSessionSql, [user.id], (err, sessionResult)=>{

            if (err) {
                return res.status(500).json({
                    error: true,
                    mess: err.message
                });
            }

            // session already exist stop login
            if (sessionResult.length > 0) {

                return res.status(409).json({
                    error: true,
                    mess: 'utente già loggato',
                    token: sessionResult[0].token
                });

            }

            // create new session
            const token = crypto.randomUUID();

            const createSessionSql = `
                INSERT INTO sessions (
                    user_id,
                    token,
                    created_at,
                    expires_at,
                    is_valid
                )
                VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 10 MINUTE), 1)
            `;

            connection.query(createSessionSql, [user.id, token], (err)=>{

                if (err) {
                    return res.status(500).json({
                        error: true,
                        mess: err.message
                    });
                }

                return res.status(200).json({
                    message: "Login effettuato",
                    token: token
                });

            });

        });

    });

}



function logout(req, res) {

    const token = req.get("Authorization");

    if (!token) {
        return res.status(401).json({
            error: true,
            mess: "token mancante"
        });
    }


    const updateSessionSql = `
        UPDATE sessions
        SET is_valid = 0
        WHERE token = ?
        AND is_valid = 1
        AND expires_at > NOW()
    `;

    connection.query(updateSessionSql, [token], (err, result) => {

        if (err) {
            return res.status(500).json({
                error: true,
                mess: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(401).json({
                error: true,
                mess: "nessuna sessione valida"
            });
        }

        return res.status(200).json({
            message: "logout effettuato"
        });
    });
}



module.exports ={signUp, login, logout}
