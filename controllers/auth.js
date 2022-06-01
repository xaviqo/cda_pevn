import pool from '../db/keys';
import bcrypt from 'bcryptjs';

const authentication = {};

authentication.logIn = async (req, res) => {

    const { usrname, psswd } = req.body;

    try {
        const sql = await (await pool.query('SELECT * FROM admin WHERE admin_usr=$1', [usrname])).rows;
        const hash = sql[0].admin_pass;
        if (bcrypt.compareSync(psswd, hash)) {
            console.log("yes");
            res.status(200).json({
                message: 'Welcome',
                admin: { usrname }
            });
        } else {
            console.log("no");
            res.status(401).json({
                message: 'Authorization refused for those credentials'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Not found',
            error
        })
    }
}

module.exports = authentication;
