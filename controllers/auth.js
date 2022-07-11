const pool = require('../db/keys');
const bcrypt = require('bcryptjs');

const authentication = {};

authentication.logIn = async (req, res) => {

    const { usrname, psswd } = req.body;

    try {
        const sql = await (await pool.query('SELECT * FROM admin WHERE admin_usr=$1', [usrname])).rows;
        const hash = sql[0].admin_pass;

        if (sql[0].admin_usr == usrname) {

            try {
                if (bcrypt.compareSync(psswd, hash)) {
                    res.status(200).json({
                        message: 'Bienvenido',
                        admin: { usrname }
                    });
                } else {
                    res.status(401).json({
                        message: 'Contraseña incorrecta'
                    });
                }
            } catch (error) {
                console.log(error);
            }


        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'El usuario no existe',
            error
        })
    }
}

module.exports = authentication;
